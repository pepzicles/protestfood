$(document).ready(function () {
    // Toggle dropdown menu
    $(".dropdown-toggle").click(function() {
        $(this).siblings(".dropdown-menu").toggle(); // Only toggle the clicked dropdown menu
    });

    // Country and Region filtering logic (existing code)
    // ...

    // Event listener for sorting by date
    $("input[name='sortDate']").change(function() {
        sortItemsByDate($(this).val());
    });

    // Sort items by date
    function sortItemsByDate(order) {
        const items = $(".flex-item").toArray();
        
        items.sort(function(a, b) {
            const dateA = new Date($(a).data("date"));
            const dateB = new Date($(b).data("date"));

            return (order === "newest") ? dateB - dateA : dateA - dateB;
        });

        // Re-append items in sorted order
        $(".flex-container").append(items);
    }

    // Update content display based on selected checkboxes
    function updateContentDisplay() {
        const selectedCountries = $("#countrySearch").closest(".dropdown-menu").find("input[type='checkbox']:checked").map(function() {
            return $(this).val();
        }).get();

        const selectedRegions = $("#region").closest(".dropdown-menu").find("input[type='checkbox']:checked").map(function() {
            return $(this).val();
        }).get();

        if (selectedCountries.length === 0 && selectedRegions.length === 0) {
            $(".flex-item").fadeIn(700); // Show all if no filters
        } else {
            $(".flex-item").hide(); // Hide all initially

            $(".flex-item").each(function() {
                const countries = $(this).data("country").split(",");
                const regions = $(this).data("region").split(",");
                
                const matchCountry = countries.some(country => selectedCountries.includes(country.trim()));
                const matchRegion = regions.some(region => selectedRegions.includes(region.trim()));

                if (matchCountry || matchRegion) {
                    $(this).fadeIn(700);
                }
            });
        }
    }

    // Close dropdown if clicked outside
    $(document).click(function(event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-menu").hide();
        }
    });

    // Initialize with all items shown
    updateContentDisplay();
});
