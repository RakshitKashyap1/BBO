/**
 * @file script.js
 * @description This script handles the main landing page's image carousel interaction.
 * It manages the automatic sliding of images in the hero search section.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select the carousel track which contains the images
    const track = document.getElementById('carouselTrack');
    
    // Check if the track exists on the current page to avoid errors
    if (!track) return;

    // Convert the track's child elements (images) into an array for easy manipulation
    const images = Array.from(track.children);
    
    // If there are no images, we don't need to do anything
    if (images.length === 0) return;

    // State management for the current active slide
    let currentIndex = 0;
    
    // Define the time interval for the slide transition (3.7 seconds)
    const intervalTime = 3700; 

    /**
     * nextSlide: Moves the carousel to the next image in the sequence.
     * If the current image is the last one, it resets to the first image.
     */
    function nextSlide() {
        currentIndex++;
        
        // Loop back to the first slide (index 0) if we've reached the end
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        /**
         * Apply the transform to the track element.
         * Since each image occupies 100% of the carousel's width,
         * we translate the track by increments of -100% * currentIndex.
         */
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Set an interval to automatically trigger the next slide after the specified time
    setInterval(nextSlide, intervalTime);
});

