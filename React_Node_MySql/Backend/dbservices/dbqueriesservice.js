const db = require("./db");
// const db = require("./myDbConnection");
const helper = require("../utilities/paginationhelper");
const config = require("../config");

async function login(loginCredential) {
  let SQLQuery = `SELECT * FROM users WHERE email="${loginCredential.email}" AND password="${loginCredential.password}"`;
  console.log("DBQueriesService login >> " + SQLQuery);
  const rows = await db.query(SQLQuery);
  console.log("dbqueriesservice >> login >> rows: " + JSON.stringify(rows));
  return rows;
}

async function createUser(user) {
  let SQLQuery = `INSERT INTO users (username, email, password, avater) VALUES (?, ?, ?, ?)`;
  const result = await db.query(SQLQuery, [
    user.name,
    user.email,
    user.password,
    user.avater,
  ]);
  let message = "Error in creating User";
  if (result.affectedRows) {
    message = "User created successfully";
  }
  return { message };
}

async function getCategories(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  //let SQLQuery = "SELECT * FROM `categories`";
  //`SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
  // FROM programming_languages LIMIT ${offset},${config.listPerPage}`

  const rows = await db.query(
    `SELECT * FROM categories LIMIT ${offset},${config.listPerPage}`
  );
  return rows;
  //   const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  //   return { data, meta };
}

async function getCategory(id) {
  const rows = await db.query(`SELECT * FROM categories WHERE id=${id}`);
  return rows;
}

async function createCategory(categoryName) {
  const result = await db.query(
    `INSERT INTO categories (name) VALUES ("${categoryName}")`
  );

  let message = "Error in creating Category";
  console.log(
    "dbQueriesService >> result.affectedRows: " + result.affectedRows
  );
  if (result.affectedRows) {
    message = "Category created successfully";
  }

  return { message };
}

async function updateCategory(id, name) {
  const result = await db.query(
    `UPDATE categories SET name="${name}" WHERE id=${id}`
  );

  let message = "Error in updating Category";

  if (result.affectedRows) {
    message = "Category updated successfully";
  }

  return { message };
}

async function deleteCategory(id) {
  const result = await db.query(`DELETE FROM categories WHERE id=${id}`);

  let message = "Error in deleting Category";

  if (result.affectedRows) {
    message = "Category deleted successfully";
  }

  return { message };
}

async function getCourseByCategory(categoryid) {
  const sql = `SELECT DISTINCT c.id, c.title, c.photo_url, c.video_url, c.type, c.category_id, c.author_id, ca.name category_name, au.name as author_name FROM courses c JOIN categories ca ON c.category_id = ca.id JOIN authors au ON c.author_id = au.id WHERE ca.id = ${categoryid}`;
  const rows = await db.query(sql);
  return rows;
}

async function getEnrollmentByUser(userid) {
  const sql = `SELECT DISTINCT c.id course_id, c.title, c.photo_url, c.video_url, c.type, us.id user_id, us.username user_name FROM courses c JOIN Enrollment en ON en.course_id = c.id JOIN users us ON en.user_id = us.id WHERE us.id = ${userid}`;
  const rows = await db.query(sql);
  return rows;
}

async function getRating(courseID) {
  const sql = `SELECT id, course_id, ROUND(AVG(rating),2) AS rating FROM ratings WHERE course_id = ${courseID}`;
  const rows = await db.query(sql);
  return rows;
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  createUser,
  login,
  getCourseByCategory,
  getEnrollmentByUser,
  getRating,
};
