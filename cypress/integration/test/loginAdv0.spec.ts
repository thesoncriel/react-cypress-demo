describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('/test/login');
    cy.get('#txt_id').as('id');
    cy.get('#txt_pw').as('pw');
    cy.get('#btn_submit').as('submit');
    cy.get('#print').as('print');
    cy.intercept('/data/signin', req => {
      req.reply(res => {
        res.body = JSON.stringify({ token: 'fail' });
      });
    }).as('apiSignin');
  });
  it('로그인에 실패하면 "로그인 실패" 얼럿이 출력된다.', () => {
    cy.get('@id').type('sonic');
    cy.get('@pw').type('1234');
    cy.get('@submit').click();
    cy.wait('@apiSignin');
    cy.get('@print').should('include.text', '실패');
  });
});
