export default app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String },
    password: { type: String },
    phone: { type: String },
    email: { type: String },
  });

  return mongoose.model('User', UserSchema);
};
