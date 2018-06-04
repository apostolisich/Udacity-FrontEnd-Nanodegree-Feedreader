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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Checks each feed in the allFeeds array to validate
         * that it includes a url.
        */
        it('have a URL for each feed', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0)
            });
        });

        /* Checks each feed in the allFeeds array to validate
         * that it includes a name. 
        */
        it('have a name for each feed', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0)
            });
        });
    });

    /* Our second test suite. It checks if the slide menu is 
     * behaving as it should.
    */
    describe('The menu', function(){
        /* Checks if the slide menu is hidden by default.
         */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Checks if the slide menu toggles it's show/hide states
          * on the menu icon click.
          */
        it('changes visibility on icon click', function(){
            $($('.menu-icon-link')).click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $($('.menu-icon-link')).click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Our third test suite. It checks if the loadFeed function
     * fills the .feed container with data at the first call.
    */
    describe('Initial Entries', function(){
        /* We are using the beforeEach function to execute some code before
         * any tests run. Here we make sure that the loadFeed function completed
         * fetching data.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /* Checks if the .feed container has at least one entry-link child.
        */
        it('should have at least one entry value', function(done){
            expect($('.feed .entry-link').length).not.toBe(0);
            done();
        });
    });

    /* Our fourth test suite. It checks if the newly loaded feed is loaded
     * by the loadFeed function and the content actually changes.
     */
    describe('New Feed Selection', function(){
        let arraysAreEqual = true;
        /* We are using the beforeEach function to execute some code before
         * any tests run. Here we use the loadFeed function twice in order
         * to get 2 different feed results and then we compare the 2 to 
         * see if the content changed. This can happen either if the length
         * of the 2 feed arrays is different or if their content is different.
         */
        beforeEach(function(done) {
            loadFeed(1, function() {
              let prevFeedData = $('.feed .entry-link');
              loadFeed(2, function(){
                let newFeedData= $('.feed .entry-link');
                arraysAreEqual = prevFeedData.html() === newFeedData.html() ? true : false;
                done();
              });
            });
        });

        it('changes the content of the page', function(done){
            expect(arraysAreEqual).toBe(false);
            done();
        });
    });
}());
