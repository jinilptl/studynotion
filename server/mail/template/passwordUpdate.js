exports.passwordUpdateTemplate = (otp) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://via.placeholder.com/150x50" alt="StudyNotion Logo" style="margin-bottom: 20px;">
          <h2 style="color: #333;">OTP Verification Email</h2>
        </div>
        <p style="font-size: 16px; color: #555;">Dear User,</p>
        <p style="font-size: 16px; color: #555;">You requested to reset your password. Please use the following OTP (One-Time Password) to complete the process:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; color: #007BFF; font-weight: bold; letter-spacing: 2px; border: 1px solid #ddd; padding: 10px 20px; border-radius: 5px;">${otp}</span>
        </div>
        <p style="font-size: 16px; color: #555;">This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
        <p style="font-size: 16px; color: #555;">Thank you,</p>
        <p style="font-size: 16px; color: #555;"><strong>StudyNotion Team</strong></p>
      </div>
    `;
  };
  