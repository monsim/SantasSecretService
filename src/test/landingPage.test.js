const sum = require('../components/Landing.js');

var Landing = require('../components/Landing.js').default;

test('adds 1 + 2 to equal 3', () => {
    var model = new Landing();
    expect(model.sum(1, 2)).toBe(3);
});

// this doesn't work - we're trying to test if the component is on the screen
//expect(Landing.contains(<LandingPage />)).toBe(false);