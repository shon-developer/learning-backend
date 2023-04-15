import mongoose from "mongoose";
import AuthRoles from "../Utils/authRoles";
import { hash } from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: ["true", "Name is required"],
            maxLength: [50, "Name must be less than 50 chars"]
        },
        email: {
            type: String,
            required: ["true", "Email is required"],
        },
        password: {
            type: String,
            required: ["true", "password is required"],
            minLength: [8, "password must contain at least 18 chars"],
            select: false,
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.User,
        },
    
        // forgot password functionality
            forgotPasswordToken: String,
            forgotPasswordExpiry: Date,
}, {timestamps: true})

    
        // encrypt password before saving
        userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
        next()
    })

        //compare the password
        userSchema.method = {
            comparepassword : async function(enteredPassword){
                return await bcrypt.compare(enteredPassword, this.password)
            }
        }

export default mongoose.model("User", userSchema)