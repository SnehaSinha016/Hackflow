import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { auth} from "../config/firebaseAdmin.js";
export const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists",

            });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

   const user = await User.create({
  name,
  email,
  password: hashedPassword,
  provider: "email",
});

  res.json({
    success: true,
    token: generateToken(user._id),
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    }
});

}catch(error){
        res.status(500).json({message:"Server error"});
}
};
export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email,});
        if(user&& (await bcrypt.compare(
            password,
            user.password
        ))
    ){
       res.json({
    success: true,
    token: generateToken(user._id),
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    }
});
    }else{
        res.status(401).json({message:"Invalid email or password",});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
    };
export const googleLogin = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({
        message: "Firebase token is required",
      });
    }

    // Verify Firebase Token
   const decodedToken = await auth.verifyIdToken(firebaseToken);
    const { uid, email, name, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ email });

    // Create user if not exists
    if (!user) {
  user = await User.create({
    name,
    email,
    firebaseUid: uid,
    avatar: picture,
    provider: "google",
  });
} else {
  user.firebaseUid = uid;
  user.avatar = picture;
  user.provider = "google";

  await user.save();
}

    // Return Backend JWT
    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message: "Invalid Firebase Token",
    });
  }
};