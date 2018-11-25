/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // Checks if the url is defined and its length is greater than zero
        it('url defined', function() {
            for (let feed of allFeeds) {            
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
        }
    })
        
        // Checks if the feed name is defined and its length is greater than zero
        it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }        
        })
    });


    describe('The menu', function() {
        // Checks if the menu is hidden by default
        it('hidden by default', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        // Checks if the menu toggles on and off
        it('toggles on and off', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

        })
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Checks if it completes its work
        it('completes work', function() {
            const entry = document.querySelector('.entry');
            expect(entry.innerText.length > 0).toBe(true);
        });

    })

    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        beforeEach(function(done) {
            loadFeed(0, function() {
                Array.from(feed.children).forEach(function(entry) {
                    firstFeed.push(entry.innerText);
                });
            });
            
            loadFeed(1, done);
        });
        // Checks for content change
        it('content changes', function() {
            Array.from(feed.children).forEach(function(entry, index) {
                console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
        })
    })
}());
