document.getElementById("allergenForm").addEventListener("submit", function(event){
    event.preventDefault();

    const form = document.getElementById("allergenForm");
    const name = document.getElementById("name").value;
    const selectedAllergens = form.querySelectorAll("input[type='checkbox']");
    const allergens = [];
    i = 0;

    selectedAllergens.forEach(checkbox => {
        if (checkbox.checked){
            allergens[i] = checkbox.value;
            i += 1;
        }
    });



});