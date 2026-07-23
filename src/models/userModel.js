const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        role: {
            type: String,
            enum: ["admin", "teacher", "student"],
            default: "student"
        },

        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active"
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        refreshToken: {
            type: String,
            default: null,
            select: false
        },

        lastLogin: {
            type: Date,
            default: null
        },

        passwordChangedAt: {
            type: Date,
            default: null
        },

        profileImage: {
            type: String,
            default: null
        }

    },
    {
        timestamps: true
    }
);


// Hash the password before saving the user document
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();

});


// Create an index on the email field for faster queries
userSchema.index({
    email: 1
});




// একটি কাস্টম ফাংশন comparePassword যুক্ত করা হয়েছে। এটি দিয়ে ব্যবহারকারীর দেওয়া ইনপুট পাসওয়ার্ড এবং
//  ডাটাবেজে সেভ থাকা হ্যাশ করা পাসওয়ার্ড মিলিয়ে দেখা হয় (লগইনের সময় প্রয়োজন হয়)।

userSchema.methods.comparePassword = async function (password) {
    
    return await bcrypt.compare(
        password,
        this.password
    );

};



// যখন ডাটা ক্লায়েন্টে/রেসপন্সে (JSON হিসেবে) পাঠানো হবে, 
// তখন ক্লায়েন্ট যেন দুর্ঘটনাবশত পাসওয়ার্ড বা রিফ্রেশ টোকেন দেখতে না পায়—সেজন্য ডাটা 
// অবজেক্ট তৈরি হওয়ার পর স্বয়ংক্রিয়ভাবে password ও refreshToken ফিল্ড দুটি ডিলি

userSchema.set("toJSON", {

    transform(doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    }

});


module.exports = mongoose.model("User", userSchema);