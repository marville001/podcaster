if (!req.files) {
    if (!req.files.avatar) {
      return res
        .status(400)
        .send({ success: false, message: "Avartar is required" });
    }
  }
  const avatar = req.files.avatar;

  let avatar_id = uuidv4();
      const appDir = dirname(require.main.filename);
      avatar.mv(`${appDir}/public/uploads/${avatar_id + "_" + avatar.name}`);