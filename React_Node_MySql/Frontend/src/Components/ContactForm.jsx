const ContactForm = () => {
  return (
    <div className={"contact-form-style"}>
      <div style={{ width: "200px", height: "150px", background: "Silver"}}>
        <h6>Follow Me</h6>
        <text>Youtube: </text>
        <br />
        <text>Facebook: </text>
      </div>
      <div style={{ width: "200px", height: "150px", background: "Silver" }}>
        <b>Address</b>
        <br />
        <text>Badda, Dhaka </text>
        <br />
        <text>Phone: 01955300313</text>
      </div>
      <div style={{ width: "200px", height: "150px", background: "Silver" }}>
        <h6>Information</h6>
        <a href="https://www.w3schools.com/css/default.asp" target="_blank">
          About Me
        </a>
      </div>
      <div style={{ width: "200px", height: "150px", background: "Silver" }}>
        <h6>Legal</h6>
        <text>Refund Policy</text>
        <br />
        <text>Terms & Condition</text>
      </div>
    </div>
  );
};

export default ContactForm;
