const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    googleID:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
        unique:false
    },
    lastName:{
        type:String,
        required:true,
        unique:false
    },
    emailID:{
        type:String,
        required:true,
        unique:true
        },
    bio:{
        type: String,
        default: '',
        required:false,
        unique:false
    },
    profileIMG:{
        type:String,
        required:false,
        unique: false,
        default:'',
    },
    username:{
        type:String,
        required:false,
        unique: true
    }
});
module.exports = mongoose.model('user', userSchema, 'userSchema');

// Data:
//  {
//    id: '100376543808895462698',
//    displayName: 'Raghav Mathur',
//    name: { familyName: 'Mathur', givenName: 'Raghav' },
//    emails: [ { value: 'raghav3501@gmail.com' } ]
//  }