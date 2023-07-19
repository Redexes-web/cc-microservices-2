'use strict';

const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Le nom ne peut pas être vide'],
		},
		email: {
			type: String,
			required: [true, "L'email ne peut pas être vide"],
			match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "L'email est invalide"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Le mot de passe ne peut pas être vide'],
			match: [
				/^(?=.*[A-Z])(?=.*[\d!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
				'Le mot de passe doit contenir au moins 8 caractères dont au moins 1 chiffre et une majuscule',
			],
		},
		roles: {
			type: [
				{
					type: String,
					enum: ['user', 'admin'],
				},
			],
			default: ['user'],
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // deal with lastUpdated
  this.lastUpdated = Date.now();
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
	  if (this._update.password) {
		this._update.password = bcrypt.hashSync(this._update.password, 10);
	  }
	  this._update.lastUpdated = Date.now();
	  next();
	});
userSchema.plugin(uniqueValidator);

const UserModel = model('User', userSchema);

module.exports = UserModel;
