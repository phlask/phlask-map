// Example Cypress test for counting markers of a specific category

describe('Close Modal with Cross Button', () => {
    it('should close the modal by clicking the cross button', () => {
      cy.visit('http://localhost:3000/');
        // Wait for the modal to be visible

    
    // Your modal selector may vary, update it accordingly
    const modalSelector = '.modal-dialog';

    // Check if the modal is visible
    cy.get(modalSelector).should('be.visible');

    // Click the close button inside the modal
    cy.get('.btn-close').click();
   // cy.get('.MuiBox-root.css-ezg4qh').click();



   cy.get('.MuiButtonBase-root.MuiButton-root')  // Add the necessary class names for the button
    .contains('Search')                         // Assuming the button text is 'Search'
    .click();
        // Wait for the search bar to appear
    cy.get('.SearchBar_desktopSearch__lUgoA').should('be.visible');

    // Type the address into the search bar
    const address = 'Indy Hall Clubhouse at 709 N 2nd St, North 2nd Street, Philadelphia, PA, USA';
    cy.get('.MuiInputBase-input').type(address);

    // Press Enter
    cy.get('.MuiInputBase-input').type('{enter}');
    cy.wait(4000);

     // Count the markers with data:image/svg+xml;utf8 src
     cy.get('img[src^="data:image/svg+xml;utf8"]').its('length').should('be.greaterThan', 0).then((totalCount) => {
      // Log the total count to the Cypress console
      cy.log(`Total Markers with data:image/svg+xml;utf8 src: ${totalCount}`);
    

    });

  });
});

    /*

   cy.should('be.visible')
   cy.get('.MuiBox-root.css-ezg4qh')
  .then($elements => {
    const length = $elements.length;
    console.log('Length of .MuiBox-root.css-ezg4qh elements:', length);
  })
   cy.get('.MuiBox-root.css-ezg4qh').should('have.length', 4)

   document.querySelector("button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium").click();

   
   cy.get('.MuiBox-root.css-ezg4qh')
   .first()  // Click the first button
   .click()
   .then(() => {
     cy.get('.MuiBox-root.css-ezg4qh')
       .eq(3)  // Target the fourth button (index starts at 0)
       .click();
      });
    });
  });

  cy.get('.MuiBox-root.css-ezg4qh').select('button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium');

   // cy.get('button').first().click();  // Clicks only the first button

   // cy.contains('button', 'Near me').click();
   // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium').click();



/*
 // Your search button selector may vary, update it accordingly
 const searchButtonSelector = 'p.MuiTypography-root.css-1l7qtvn-MuiTypography-root';

 // Click on the search button
 cy.get(searchButtonSelector).click();


 // Scroll to the search bar
    cy.get('.SearchBar_searchInput__34X3s').scrollIntoView();

    // Input the address in the search bar
    cy.get('.SearchBar_searchInput__34X3s').type('709 N 2nd St 3rd Floor, Philadelphia, PA 19123');

    // Press Enter to perform the search
    cy.get('.SearchBar_searchInput__34X3s').type('{enter}');
    cy.wait(4000);
   
  cy.get('.Toolbar_title__WgKGa.Toolbar_waterTitle__1YPfG').click();


    // You can add a wait or other actions if necessary
    cy.wait(2000); // Adjust the wait time as needed


   cy.get('.Toolbar_toolbarButton__Wo12h.Toolbar_foodButton__3teP8.Toolbar_disabled__JkTSp')
  .click();

  cy.wait(2000); // Adjust the wait time as needed




cy.get('.Toolbar_toolbarButton__Wo12h.Toolbar_waterButton__djNja.Toolbar_disabled__JkTSp')
  .click();

cy.wait(2000); // Adjust the wait time as needed



for (let i = 0; i < 3; i++) {

cy.get('.ReactGoogleMaps_mapContainer__3SvJK')
    .then($mapElement => {
      // Custom logic to simulate zooming out (e.g., manipulating the map's scale)
      // Replace the following line with your specific logic
      $mapElement[0].dispatchEvent(new WheelEvent('wheel', { deltaY: -500 }));
cy.wait(2000); 

});
}



  });





 });



/*
      } 


ReactGoogleMaps_mapContainer__3SvJK


else 


{

<h3 class="
            Toolbar_title__WgKGa
            Toolbar_waterTitle__1YPfG
          ">Water Map</h3>









cy.get('.ReactGoogleMaps_searchBarContainer__3xEc3 input.SearchBar_searchInput__34X3s').type('709 N 2nd St 3rd Floor, Philadelphia, PA 19123');

    // Optionally, you can press Enter to trigger the search (if your application works this way)
   cy.get('.ReactGoogleMaps_searchBarContainer__3xEc3 input.SearchBar_searchInput__34X3s').type('{enter}');







	
    // Wait for search results to load
    cy.get('.search-results').should('have.length.greaterThan', 0);



  // Assuming each marker has a class, replace '.tap-info-icon-img' with the actual marker class
    cy.get('.tap-info-icon-img').first().click(); // Click on the first marker

    // Wait for the marker selection behavior (replace with appropriate selector or behavior)
    cy.get('.selected-marker-info').should('exist');

    // Count the total number of markers
    cy.get('.tap-info-icon-img').should('have.length.greaterThan', 0).then((count) => {
      cy.log(`Total number of markers: ${count}`);
    });



  
      // Assuming there's a filter option for "water tap"
      cy.get('#category-filter').select('Water Tap');
  
      // Wait for the map and markers to load
      cy.get('#map').should('be.visible');
  
      // Get all markers with the class 'water-tap-marker'
      cy.get('.water-tap-marker').as('waterTapMarkers');
  
      // Assert that there's at least one water tap marker
      cy.get('@waterTapMarkers').should('have.length.greaterThan', 0);
  
      // Log the total number of water tap markers
      cy.get('@waterTapMarkers').its('length').then((count) => {
        cy.log(`Total number of water tap markers: ${count}`);
*/