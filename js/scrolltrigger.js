// Initialte the gsap
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// Initialize gsap media match for responsive animations
let mm = gsap.matchMedia();

mm.add(
  {
    desktop_xl: "(min-width: 1200px) and (max-width: 1920px)",
    desktop_lg: "(min-width: 992px) and (max-width: 1199px)",
    desktop_md: "(min-width: 768px) and (max-width: 991px)",
    tablet: "(min-width: 576px) and (max-width: 767px)",
    mobile_lg: "(min-width: 481px) and (max-width: 575px)",
    mobile_md: "(min-width: 381px) and (max-width: 480px)",
    mobile_sm: "(min-width: 286px) and (max-width: 380px)",
    mobile_xsm: "(max-width: 285px)",
  },
  (context) => {
    let conditions = context.conditions;
    console.log(conditions);
    // Get all img elements inside the slider
    let parentWrapper = document.querySelector(".MS-content");
    let childItems = parentWrapper.querySelectorAll(".prodBox");

    // assign the default index value for image array.
    // The image with this index will replace during the animation
    let middleIndex = 1;

    // Move up themiddleIndex by one
    function right_arrow() {
      if (middleIndex >= 5) {
        middleIndex = 0;
      } else {
        middleIndex += 1;
      }
    }

    // Move down themiddleIndex by one
    function left_arrow() {
      if (middleIndex <= 0) {
        middleIndex = 5;
      } else {
        middleIndex -= 1;
      }
    }

    // Get the current image element
    let imageElement = () => {
      return childItems[middleIndex].children[0].children[0].children[0];
    };

    // Handle slider button click events
    document.getElementById("ms-left").onclick = left_arrow;
    document.getElementById("ms-right").onclick = right_arrow;

    if (conditions.mobile_sm || conditions.mobile_xsm) {
      middleIndex = 0;
      $("#beer_can").attr("src", imageElement().currentSrc);
    } else if (conditions.mobile_md) {
      middleIndex = 0;
      $("#beer_can").attr("src", imageElement().currentSrc);
    } else if (conditions.mobile_lg) {
      middleIndex = 0;
      $("#beer_can").attr("src", imageElement().currentSrc);
    } else if (conditions.tablet) {
      middleIndex = 0;
      $("#beer_can").attr("src", imageElement().currentSrc);
    }

    // Set the svg path dynamically for the animation
    let pathEl = document.querySelector("#motionpath");

    // Hide the middle beer can in the slider at the begining
    $(childItems[middleIndex]).css("display", "none");

    function motion_path() {
      if (conditions.desktop_xl) {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 300.833 -100 275 350 2700"
        );
        return "#motionpath";
      } else if (conditions.desktop_lg) {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 300.833 -100 275 550 2700"
        );
        return "#motionpath";
      } else if (conditions.desktop_md) {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 300.833 -100 275 600 2700"
        );
        return "#motionpath";
      } else if (conditions.tablet) {
        pathEl.setAttribute("d", "M417.2 1.5C255.267 300.833 -1 1005 614 2700");
        return "#motionpath";
      } else if (conditions.mobile_lg) {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 350.833 1000 475 -1950 35000"
        );
        return "#motionpath";
      } else if (conditions.mobile_md) {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 350.833 1000 400 -1950 30000"
        );
        return "#motionpath";
      } else if (conditions.mobile_sm || conditions.mobile_xsm) {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 350.833 1000 0 -1950 35000"
        );
        return "#motionpath";
      } else {
        pathEl.setAttribute(
          "d",
          "M417.2 1.5C255.267 300.833 -100 275 350 2700"
        );
        return "#motionpath";
      }
    }
    // Start the animation
    gsap.to("#beer_can", {
      scrollTrigger: {
        trigger: "#trigger",
        start: "top",
        end: "+=600px",
        scrub: 1,
        onUpdate: function (self) {
          // Change the beer can image to current image
          $("#beer_can").attr("src", imageElement().currentSrc);

          // Check the scroll event and update the image
          if (self.direction === -1 && self.progress < 1) {
            //Disable slider button when animation in action
            document.getElementById("ms-left").disabled = true;
            document.getElementById("ms-right").disabled = true;

            $("#beer_can").css({ opacity: 1 });
            $(childItems[middleIndex]).css("display", "none");
          } else if (self.progress === 1) {
            // Enable slider buttons after animation is done
            document.getElementById("ms-left").disabled = false;
            document.getElementById("ms-right").disabled = false;

            $(childItems[middleIndex]).css("display", "block");
            $("#beer_can").css({ opacity: 0 });
          } else if (
            self.direction === 1 &&
            (self.progress >= 0 || self.progress < 1)
          ) {
            //Disable slider button when animation in action
            document.getElementById("ms-left").disabled = true;
            document.getElementById("ms-right").disabled = true;

            $("#beer_can").css({ opacity: 1 });
            $(childItems[middleIndex]).css("display", "none");
          }
        },
      },
      duration: 80,
      ease: "sine.out",
      pin: true,
      immediateRender: true,
      motionPath: {
        path: motion_path,
        align: motion_path,
        autoRotate: function () {
          if (conditions.mobile_lg) {
            return 270;
          } else if (conditions.mobile_md) {
            return 270;
          } else if (conditions.mobile_sm || conditions.mobile_xsm) {
            return 270;
          } else {
            return 265;
          }
        },
        end: function () {
          if (conditions.desktop_xl) {
            return 0.264;
          } else if (conditions.desktop_lg) {
            return 0.215;
          } else if (conditions.desktop_md) {
            return 0.208;
          } else if (conditions.tablet) {
            return 0.256;
          } else if (conditions.mobile_lg) {
            return 0.0413;
          } else if (conditions.mobile_md) {
            return 0.0544;
          } else if (conditions.mobile_sm) {
            return 0.0392;
          } else if (conditions.mobile_xsm) {
            return 0.0375;
          } else {
            return 0.264;
          }
        },
        alignOrigin: [0.5, 0.5],
      },
      scale: function () {
        if (conditions.desktop_xl) {
          return 0.78;
        } else if (conditions.desktop_lg) {
          return 0.88;
        } else if (conditions.desktop_md) {
          return 1;
        } else if (conditions.tablet) {
          return 0.775;
        } else if (conditions.mobile_lg) {
          return 0.77;
        } else if (conditions.mobile_md) {
          return 1.1;
        } else if (conditions.mobile_sm) {
          return 1.23;
        } else if (conditions.mobile_xsm) {
          return 1.58;
        } else {
          return 0.78;
        }
      },
    });
  }
);
