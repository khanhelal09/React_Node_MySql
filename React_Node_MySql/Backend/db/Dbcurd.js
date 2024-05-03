const postData = [{"id": 101,"name": "Json","email": "abd@gamil.com","phone": "+8701827389"},{"id": 102,"name": "Tom","email": "tom@gamil.com","phone": "+120827389"},{"id": 103,"name": "Kim","email": "kim@gamil.com","phone": "0198727389"},{"id": 104,"name": "William","email": "william@gamil.com","phone": "01324389"},{"id": 105,"name": "Ket","email": "ket@gamil.com","phone": "07627389"}];

//Login check: SELECT * FROM `user` WHERE email='helal.uddin@bjitgroup.com' AND password='12345';
//Signup: let SQLQuery = "INSERT INTO `user`(`name`, `email`, `password`,`avater`) VALUES ('" + name + "','" + email + "','" + password + "','" + avater + "')"
//INSERT INTO `courses`(`title`, `description`, `photo_url`, `video_url`, `type`, `hit_count`, `category_id`, `author_id`) VALUES ('Learn React JS with example','React Js course is designed by a skilled and experienced architect','photo_url','video_rul','free','0','1','2');
//SELECT DISTINCT c.id, c.title, c.photo_url, c.video_url, c.type, c.hit_count, c.category_id, c.author_id, ca.name FROM courses c JOIN categories ca ON c.category_id = ca.id WHERE ca.id = 1;

function InsertData(connection){
    let SQLQuery = "INSERT INTO `students_list`(`name`, `email`, `phone`) VALUES ('Bad Khan','khan@gmail.com','01955300313')"
    connection.query(SQLQuery, function(error){
      if(error){
        console.log("Data insert failed");
      } else {
        console.log("Data insert success");
      }
    })
  }
  
  function selectData(con){
    let SQLQuery = "SELECT * FROM `students_list`";
    con.query(SQLQuery, function(error){
      if(error){
        console.log("Data insert failed");
      } else {
        console.log("Data insert success");
      }
    })
  }
  
  function selectDataByID(con){
    const id = 6;
    let SQLQuery = "SELECT * FROM `students_list` WHERE `id`=" + id + "";
    console.log("inside selectDataByID query: " + SQLQuery );
  
    con.query(SQLQuery, function(error, result){
      if(error){
        console.log("selectDataByID received failed");
      } else {
        console.log("selectDataByID received success");
        console.log(result);
      }
    })
  }
  
  function deleteDataByID(con, id){
      let SQLQuery = "DELETE FROM `students_list` WHERE `id`=" + id + "";
      console.log("Inside deleteDataByID query: " + SQLQuery);
      
      con.query(SQLQuery, function(error){
        if(error){
          console.log("Data Deleted failed");
        } else {
          console.log("Data Deleted success");
        }
      })
  }
  
  function updateData(con,name,email,phone){
    let SQLQuery = "UPDATE `students_list` SET `name`='" + name + "',`email`='" + email + "',`phone`='" + phone + "' WHERE `id`=" + id + "";
    con.query(SQLQuery, function(error){
        if(error){
          console.log("Data Updated failed");
        } else {
          console.log("Data Updated success");
        }
      })
  }