import axios from "axios";

export const register = newUser => {
  return axios
    .post("/users/register", {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      isTeacher: newUser.isTeacher
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error("Something occured! " + err);
    });
};

export const login = user => {
  return axios
    .post("/users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.error("Oops! " + err);
    });
};

export const addCourse = course => {
  return axios
    .post("/courses/addcourse", {
      author: course.author,
      courseDescription: course.courseDescription,
      courseName: course.courseName,
      rating: 0,
      jwt: course.jwt
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error("Oops! " + err);
    });
};

export const getCourses = () => {
  return axios
    .get("/courses")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error("Oops! " + err);
    });
};

export const getCoursePage = id => {
  return axios
    .get("/courses/" + id)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error("Oops! " + err);
    });
};

export const enrollCourse = (id, utoken, name) => {
  return axios
    .post("/courses/" + id + "/enroll", {
      token: utoken,
      courseName: name
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {});
};

export const getEnrolledCourses = id => {
  return axios.get("/courses/getcourses/" + id).then(res => {
    console.log(res.data);
    return res.data;
  });
};
