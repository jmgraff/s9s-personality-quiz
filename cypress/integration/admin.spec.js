describe('Admin', function () {
    beforeEach(() => {
        cy.visit('/wp-login.php');

        cy.wait(2000); //FIXME: rq-10: this is dumb. Cypress was supposed to make this unnecessary.
        cy.get('#user_login').type('admin');
        cy.get('#user_pass').type('admin');
        cy.get('#wp-submit').click();
    });

    it('Creates a quiz', function() {
        cy.visit('/wp-admin/post-new.php?post_type=reactquiz_quiz');

        cy.get('#title').type('Test Quiz');
        cy.get('#reactquiz-title').type('my new quiz');
        cy.get('#reactquiz-description').type('my new quiz description');

        cy.get('#publish').click();
        cy.get('#sample-permalink').click();
    });

    it('Updates a quiz', function() {
        cy.visit('/wp-admin/edit.php?post_type=reactquiz_quiz');

        cy.get('.row-title').first().click();
        cy.get('#reactquiz-title').clear().type('my newer quiz');
        cy.get('#publish').click();
        cy.get('#sample-permalink').click();

        cy.get('#reactquiz h1').first().should('contain', 'my newer quiz');
    });

});
