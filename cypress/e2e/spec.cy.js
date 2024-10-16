
describe('User Tests', () => {

  beforeEach(() => {
    cy.viewport(1200, 750);
    cy.visit("http://localhost:3000");
    cy.wait(500);
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });


  it('Guest User Success', function () {
    cy.contains('CONTINUE AS GUEST', { matchCase: false, timeout: 10000 }).click();

    cy.location('href').should('include', '/browser')
  });

  it('Log In Success', function () {
    cy.contains('Login', { matchCase: false, timeout: 10000 }).click();

    cy.wait(1000);


    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();

    cy.location('href').should('include', '/home');
  });

  it('Register', function () {
    let ran = Math.random()

    cy.contains('Create An Account', { matchCase: false, timeout: 10000 }).click();

    cy.wait(1000);


    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('Clone' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', { matchCase: false, timeout: 10000 }).click();

    cy.location('href').should('include', '/home')

  });

  it('Fail Login Empty', function () {
    cy.contains('Login', { matchCase: false, timeout: 10000 }).click();

    cy.wait(1000);

    // empty both
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.");
    cy.contains('Close', { matchCase: false, timeout: 10000 }).click();

    // empty password
    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.");
    cy.contains('Close', { matchCase: false, timeout: 10000 }).click();

    // empty email
    cy.get('#email').clear('E');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.", {timeout: 10000});
  });



  it('Fail Login Incorrect', function () {
    cy.contains('Login', { matchCase: false, timeout: 10000 }).click();

    cy.wait(1000);

    // wrong email
    cy.get('#email').type('exampleUser854734t65274723');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.", {timeout: 10000})
    cy.contains('Close', { matchCase: false, timeout: 10000 }).click();

    // wrong password
    cy.get('#email').clear('E');
    cy.get('#password').clear('E');
    cy.get('#email').type('exampleUser');
    cy.get('#password').type('exampleUser854734t65274723');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.");
    cy.contains('Close', { matchCase: false }).click();

    // wrong both
    cy.get('#email').clear('E');
    cy.get('#password').clear('E');
    cy.get('#email').type('exampleUser854734t65274723');
    cy.get('#password').type('exampleUser854734t65274723');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.");
  });

  it('Fail Login then Log in', function () {
    cy.contains('Login', { matchCase: false }).click();

    cy.wait(1000);

    cy.get('#email').type('exampleUser854734t65274723');
    cy.get('#password').type('exampleUser854734t65274723');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.");

    cy.contains('Close', { matchCase: false, timeout: 10000 }).click()

    cy.get('#email').clear('E');
    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#password').clear('P');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();

    cy.wait(1000);

    cy.location('href').should('include', '/home');
  });



  it('Fail Register Blank', function () {
    let ran = Math.random();

    // blank firstName
    cy.contains('Create An Account', { matchCase: false }).click();
    cy.wait(1000);

    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('Clone' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: Please enter all required fields.");
    cy.contains('Close', { matchCase: false }).click();

    // blank UserName
    cy.get('#userName').clear("E");
    cy.get('#firstName').type('Clone');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: Please enter all required fields.");
    cy.contains('Close', { matchCase: false }).click();

    // blank Password
    cy.get('#password').clear("E");
    cy.get('#userName').type('Clone' + ran);

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: Please enter all required fields.");

  });

  it('Fail Register Duplicates', function () {
    let ran = Math.random();

    cy.contains('Create An Account', { matchCase: false }).click(); 
    cy.wait(1000);


    // duplicate UserName
    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing');
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: An account with this user name already exists.");
    cy.contains('Close', { matchCase: false }).click();

    // duplicate email
    cy.get('#userName').clear("E");
    cy.get('#userName').type('CloneKing' + ran);
    cy.get('#email').clear("E");
    cy.get('#email').type('clone.cloneson@stonybrook.edu');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: An account with this email address already exists.");
  });

  it('Fail Register Invalid', function () {
    let ran = Math.random();

    cy.contains('Create An Account', { matchCase: false }).click();
    cy.wait(1000);


    // Invalid email
    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '#stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: Please enter a valid email.");
    cy.contains('Close', { matchCase: false }).click();

    // invalid password
    cy.get('#email').clear("E");
    cy.get('#email').type('clone.cloneson' + ran + '#stonybrook.edu');
    cy.get('#password').clear("E");
    cy.get('#confirmPassword').clear("E");
    cy.get('#password').type('secret');
    cy.get('#confirmPassword').type('secret');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: Please enter a password of at least 8 characters.");
    cy.contains('Close', { matchCase: false }).click();

    // invalid confirm password
    cy.get('#password').clear("E");
    cy.get('#confirmPassword').clear("E");
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword2');

    cy.contains('Confirm Registration', { matchCase: false }).click();

    cy.contains("Error: Please enter the same password twice.");

  });

});



describe('Home Tests', () => {

  beforeEach(() => {
    cy.viewport(1200, 750)
    cy.visit("http://localhost:3000")

    cy.contains('Login', { matchCase: false }).click();
    cy.get('#email').type('Test@runner.com');
    cy.get('#password').type('TestRunner');
    cy.get('#signIn').click();
    cy.location('href').should('include', '/home')
    cy.wait(500);
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });


  it('Logged in vs Guest', function () {
    cy.contains("CREATE NEW MAP", { matchCase: false, timeout: 10000 })

    cy.get('#profileButton').click();

    cy.contains("VIEW PROFILE", { matchCase: false, timeout: 10000 })

    cy.contains("LOG OUT", { matchCase: false, timeout: 10000 }).click()

    cy.contains('CONTINUE AS GUEST', { matchCase: false, timeout: 10000 }).click();

    cy.location('href').should('include', '/browser')

    cy.contains("CREATE NEW MAP", { matchCase: false }).should('not.be.visible')

    cy.get('#profileButton').click();

    cy.contains("VIEW PROFILE", { matchCase: false }).should('not.be.visible')

  });

  it('Logged Profile', function () {
    cy.get('#profileButton').click();

    cy.contains('View Profile', { matchCase: false, timeout: 10000 }).click();

    cy.location('href').should('include', '/profile')

    cy.contains("First Name: Test", { timeout: 10000 })
    cy.contains("User Name: TestRunner", { timeout: 10000 })
  });

  it('Home page Create Map', function () {
    cy.contains('Create New Map', { matchCase: false, timeout: 10000 }).click();

    cy.location('href').should('include', '/createNewMap')
  });


  it('Home page searching', function () {
    cy.contains('Map 1', { matchCase: false, timeout: 10000 });
    cy.contains('Map 2', { matchCase: false, timeout: 10000 });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });


    cy.get('#searchBar').type("Map 2{enter}");
    cy.contains('Map 1', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 2', { matchCase: false, timeout: 10000 });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });

    cy.get('#searchBar').clear('E');
    cy.get('#searchBar').type("Map 1{enter}");
    cy.contains('Map 1', { matchCase: false, timeout: 10000 });
    cy.contains('Map 2', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 21', { matchCase: false, timeout: 10000 }).should('not.exist');

    cy.get('#searchBar').clear('E');
    cy.get('#searchBar').type("{enter}");
    cy.get('#searchBar').type("dsjhagbjhgkd{enter}");
    cy.contains('Map 1', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 2', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 21', { matchCase: false, timeout: 10000 }).should('not.exist');

    cy.get('#searchBar').clear('E');
    cy.get('#searchBar').type("{enter}");
    cy.contains('Map 1', { matchCase: false, timeout: 10000 });
    cy.contains('Map 2', { matchCase: false, timeout: 10000 });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });

  });


  it('Home page Filtering 1', function () {
    cy.wait(1000)
    cy.get(".MuiInputBase-root > #select-filter").click();
    cy.get('[data-value="Text"]').click();


    cy.get("#applyFilter").click({ force: true });
    cy.contains('Map 1', { matchCase: false, timeout: 10000 });
    cy.contains('Map 2', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 21', { matchCase: false, timeout: 10000 }).should('not.exist');

    cy.get('#searchBar').type("dsjhagbjhgkd{enter}", { force: true });
    cy.contains('Map 2', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 21', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 1', { matchCase: false, timeout: 10000 }).should('not.exist');
  });

  it('Home page Filtering 2', function () {
    cy.wait(1000);
    cy.get(".MuiInputBase-root > #select-filter").click();
    cy.get('[data-value="Color"]').click();


    cy.get("#applyFilter").click({ force: true });
    cy.contains('Map 1', { matchCase: false, timeout: 10000 }).should('not.exist');
    cy.contains('Map 2', { matchCase: false, timeout: 10000 });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });

    cy.get('#searchBar').type("Map 21{enter}", { force: true });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });
    cy.contains('Map 1', { matchCase: false, timeout: 10000 }).should('not.exist');
  });

  it('Home page Filtering 3', function () {
    cy.wait(1000);
    cy.get(".MuiInputBase-root > #select-filter").click();
    cy.get('[data-value="Color"]').click();
    cy.get('[data-value="Text"]').click();


    cy.get("#applyFilter").click({ force: true });
    cy.contains('Map 1', { matchCase: false, timeout: 10000 });
    cy.contains('Map 2', { matchCase: false, timeout: 10000 });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });

    cy.get('#searchBar').type("1{enter}", { force: true });
    cy.contains('Map 21', { matchCase: false, timeout: 10000 });
    cy.contains('Map 1', { matchCase: false, timeout: 10000 });
  });




});