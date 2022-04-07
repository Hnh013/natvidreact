const signupFormInputs = [        
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Firstname",
      errormessage: "It should be a valid first name!",
      label: "Firstname",
      pattern:'^[a-zA-Z\s]+$',
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Lastname",
      errormessage: "It should be a valid last name!",
      label: "Lastname",
      pattern:'^[a-zA-Z\s]+$',
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errormessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errormessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
];

export default signupFormInputs;