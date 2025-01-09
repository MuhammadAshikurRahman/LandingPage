document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Review Section
    // ==========================
    const reviewContainer = document.getElementById('reviewContainer');
    let imageIndex = 0;

    // List of images
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVRySupaWTdn6YIx18cvjRxsD6uTIveTT4GQ&s",
        "https://www.bongodorshon.com/uploads/story_image/the_bengal_s_nolen_gur_Jaggery_patali_bd.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUuxkoeAW3ow7Y5YUtv0PAbseQQyANWFBhsg&s",
    ];

    // Track already displayed images
    const displayedImages = new Set();

    // Load images dynamically
    function loadMoreImages() {
        const fragment = document.createDocumentFragment();

        // Load up to 3 new images without repeating
        let loadedCount = 0;
        while (loadedCount < 3 && displayedImages.size < images.length) {
            const imgSrc = images[imageIndex];
            if (!displayedImages.has(imgSrc)) {
                const img = document.createElement('div');
                img.classList.add('review-card');
                img.innerHTML = `<img src="${imgSrc}" alt="Review ${imageIndex + 1}">`;
                fragment.appendChild(img);
                displayedImages.add(imgSrc);
                loadedCount++;
            }
            imageIndex = (imageIndex + 1) % images.length; // Move to the next image
        }

        reviewContainer.appendChild(fragment);
    }

    // Event listener to load images on scroll
    reviewContainer.addEventListener('scroll', () => {
        if (reviewContainer.scrollTop + reviewContainer.clientHeight >= reviewContainer.scrollHeight) {
            loadMoreImages();
        }
    });

    // Initial image load
    loadMoreImages();

    // ==========================
    // Order Section
    // ==========================
    const incrementBtn = document.querySelector(".increment-btn");
    const decrementBtn = document.querySelector(".decrement-btn");
    const quantityInput = document.querySelector(".quantity");
    const productPrice = 300;
    const deliveryCharge = 50;
    const totalAmount = document.querySelector(".total-amount");
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const mfsSection = document.querySelector(".mfs-section");
    const mfsAmountInput = document.querySelector("#mfs-amount");
    const orderForm = document.querySelector(".order-form");
    const successMessage = document.getElementById("success-message");
    const orderDetails = document.getElementById("order-details");

    // Update the total amount
    function updateTotal() {
        const quantity = parseInt(quantityInput.value, 10);
        const total = quantity * productPrice + deliveryCharge;
        totalAmount.textContent = `${total} টাকা`;
        mfsAmountInput.value = total;
    }

    // Increment quantity
    incrementBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value, 10) + 1;
        updateTotal();
    });

    // Decrement quantity
    decrementBtn.addEventListener("click", () => {
        const currentQuantity = parseInt(quantityInput.value, 10);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
            updateTotal();
        }
    });

    // Toggle MFS section based on payment method
    paymentRadios.forEach((radio) => {                                                                                    
        radio.addEventListener("change", (e) => {
            if (e.target.value === "Online") {
                mfsSection.style.display = "block";
            } else {
                mfsSection.style.display = "none";
            }
        });
    });

    // Handle order form submission
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(orderForm);
        const details = `
            <p>নাম: ${formData.get("name")}</p>
            <p>ফোন: ${formData.get("phone")}</p>
            <p>ঠিকানা: ${formData.get("address")}</p>
            <p>পেমেন্ট পদ্ধতি: ${formData.get("payment")}</p>
            ${formData.get("payment") === "Online" ? `
                <p>এমএফএস: ${formData.get("mfs")}</p>
                <p>ট্রাঞ্জেকশন আইডি: ${formData.get("trxid")}</p>
            ` : ""}
        `;

        orderDetails.innerHTML = details;
        successMessage.style.display = "block";
        orderForm.reset();
        updateTotal();
    });

    // Initial total update
    updateTotal();
});
