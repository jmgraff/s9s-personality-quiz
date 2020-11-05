describe('Admin', function () {
    beforeEach(() => {
        cy.visit('/wp-login.php');

        cy.wait(2000); //FIXME: rq-10: this is dumb. Cypress was supposed to make this unnecessary.
        cy.get('#user_login').type('admin');
        cy.get('#user_pass').type('admin');
        cy.get('#wp-submit').click();
    });

    it('Creates a quiz', function() {
        cy.visit('/wp-admin/post-new.php');
        cy.get('.edit-post-welcome-guide button[aria-label="Close dialog"]').click();
        cy.get('textarea[placeholder="Add title"]').type('Test Quiz Post Title');
        cy.get('.edit-post-visual-editor button[aria-label="Add block"]').click();
        cy.contains('S9S Personality Quiz').click();
        cy.get('[aria-label*="Block: S9S Personality Quiz"]').should('be.visible')
        cy.contains('Quiz Title').should('be.visible');
        cy.get('input[value="Color Quiz"]').clear().type("Color Quiz (2)");
        cy.contains('Quiz Description').should('be.visible');
        cy.contains('Questions').click({force: true});
        cy.contains('Question Title').should('be.visible');
        cy.contains('Results').click({force: true});
        cy.contains('Result Title').should('be.visible');
        cy.contains('Publish').first().click();
        cy.get('.editor-post-publish-panel button.editor-post-publish-button').click();
        cy.contains('View Post').click();
        cy.contains('View Post').click(); //not sure why this needs to happen twice
        cy.contains('Color Quiz (2)').should('be.visible');
    });
});
