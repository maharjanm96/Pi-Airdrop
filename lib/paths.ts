const ROOTS = {
  admin: "/admin",
  user: "/user",
  public: "/",
};

export const paths = {
  auth: {
    forgotpassword: "/forgotpassword",
    resetpassword: "/resetpassword",
    signup: "/signup",
    login: "/login",
    error: "/auth/error",
  },
  public: {
    contact: `${ROOTS.public}contact`,
  },

  admin: {
    dashboard: `${ROOTS.admin}/dashboard`,
    profile: `${ROOTS.admin}/profile`,
    contact: `${ROOTS.admin}/contact`,
  },
  user: {
    dashboard: `${ROOTS.user}`,
    profile: `${ROOTS.user}/profile`,
  },
};
