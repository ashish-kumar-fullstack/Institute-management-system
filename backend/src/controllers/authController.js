const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const createSlug = require("../utils/slug");
const Institute = require("../models/institute");
const User = require("../models/user");
const hashPassword = require("../utils/hashpassword");
const { generateAccessToken } = require("../utils/token.js");

const registerInstitute = asyncHandler(async (req, res) => {
  const { instituteName, adminName, slug, email, password } = req.body;

  if (!instituteName || !adminName || !slug || !email || !password) {
    throw new ApiError(400, "Please fill all the fields");
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      "Password must contain at least 6 characters"
    );
  }

  const normalizedEmail = email.toLowerCase().trim();
  const tenantSlug = createSlug(slug || instituteName);

  const isSlugExist = await Institute.findOne({
    slug: tenantSlug,
  });

  if (isSlugExist) {
    throw new ApiError(409, "Slug already exists");
  }

  /*
   * Your previous code checked Institute.findOne({ email }).
   * Login users are stored in User, so check the User collection.
   */
  const isEmailExist = await User.findOne({
    email: normalizedEmail,
  });

  if (isEmailExist) {
    throw new ApiError(409, "Email already exists");
  }

  let institute;

  try {
    institute = await Institute.create({
      name: instituteName.trim(),
      slug: tenantSlug,
      email: normalizedEmail,
    });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: adminName.trim(),
      email: normalizedEmail,
      passwordHash: hashedPassword,
      role: "institute_admin",
      instituteId: institute._id,
    });

    institute.ownerUserId = user._id;
    await institute.save();

    const accessToken = generateAccessToken(user);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Institute created successfully",
      data: {
        institute: {
          id: institute._id,
          name: institute.name,
          slug: institute.slug,
        },
        user: {
          id: user._id,
          instituteId: user.instituteId,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    /*
     * Manual cleanup because you are not using a transaction.
     */
    if (institute?._id) {
      await User.deleteMany({
        instituteId: institute._id,
      }).catch(() => {});

      await Institute.findByIdAndDelete(institute._id).catch(() => {});
    }

    throw error;
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
    isActive: true,
  }).select("+passwordHash");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.passwordHash) {
    throw new ApiError(
      500,
      "Password hash is missing for this user"
    );
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  /*
   * Pass the user document directly.
   * Do not use Loginuser and loginInstitute field names.
   */
  const accessToken = generateAccessToken(user);

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        instituteId: user.instituteId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

module.exports = {
  registerInstitute,
  login,
};