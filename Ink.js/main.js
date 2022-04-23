var storyContent = ﻿{"inkVersion":19,"root":[["^A text-based Detective game.","\n",{"#":"author: Alyssa Briscoe"},"ev","str","^Continue?","/str","/ev",{"*":"0.c-0","flg":20},{"c-0":["^ ",{"->":"start"},"\n",{"->":"0.g-0"},{"#f":5}],"g-0":["done",{"#f":5}]}],"done",{"start":[["^Suddenly the ring of a cellphone cuts the dead silence.","\n","^“Hello? Detective ","ev",{"x()":"player_name"},"out","/ev","^? Sorry for the rude awakening but this one can’t wait until the morning. Young woman, maybe 25, found in the alley behind Gordon Ave stabbed to death…”","\n","ev","str","^Finish Call","/str","/ev",{"*":".^.c-0","flg":20},{"c-0":["^ ",{"->":"start2"},"\n",{"#f":5}]}],{"#f":1}],"start2":[["^You set the phone down and with eyes barely open, start the morning routine: shower, dress, get out the door to the diner down the street that's open 24/7. You order two coffees to go and you head to the scene. It’s easy to find and there waiting for you is your partner, Name.","\n","ev","str","^Talk to your partner","/str","/ev",{"*":".^.c-0","flg":20},{"c-0":["^ ",{"->":"start3"},"\n",{"#f":5}]}],{"#f":1}],"start3":["^“Thanks for the coffee. I’ll catch you up to speed. A guy leaving the bar decided to take the alley and stumbled upon our girl, called it in right away and he’s getting a lift to the station so he can be interviewed. It’s been raining pretty heavily so we probably won’t get much in the fingerprint/DNA route but the victim was carrying a purse so we can at least look at that…”","\n","^It’s time to get to work. What should you investigate first?","\n",{"->":"crime_scene"},{"#f":1}],"crime_scene":[["ev","str","^The Body","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^The Purse","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^The Phone","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^End Investigation","/str","/ev",{"*":".^.c-3","flg":4},{"c-0":["^ ",{"->":"body"},"\n",{"#f":5}],"c-1":["^ ",{"->":"purse"},"\n",{"#f":5}],"c-2":["^ ",{"->":"phone"},"\n",{"#f":5}],"c-3":["^ ",{"->":"end_inves"},"\n",{"#f":5}]}],{"#f":1}],"body":[{"#":"IMAGE: \"Images/card-spades-1.png\""},"^You picked the right choice.","\n",{"->":"crime_scene"},{"#f":1}],"purse":["^You picked the wrong choice.","\n",{"->":"crime_scene"},{"#f":1}],"phone":["^The phone.","\n",{"->":"crime_scene"},{"#f":1}],"end_inves":["^The story continues.","\n","end",{"#f":1}],"player_name":["ev","str","^Nobody","/str","/ev","~ret",{"#f":1}],"#f":1}],"listDefs":{}};
(function(storyContent) {

    var story = new inkjs.Story(storyContent);
    story.BindExternalFunction ("player_name", () => {
        // 'prompt' is a built-in Javascript method
        return prompt("Please enter your name", "Nobody");
    });

    var storyContainer = document.querySelectorAll('#story')[0];

    function showAfter(delay, el) {
        setTimeout(function() { el.classList.add("show") }, delay);
    }

    function scrollToBottom() {
        var progress = 0.0;
        var start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var dist = document.body.scrollHeight - window.innerHeight - start;
        if( dist < 0 ) return;

        var duration = 300 + 300*dist/100;
        var startTime = null;
        function step(time) {
            if( startTime == null ) startTime = time;
            var t = (time-startTime) / duration;
            var lerp = 3*t*t - 2*t*t*t;
            window.scrollTo(0, start + lerp*dist);
            if( t < 1 ) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function continueStory() {

        var paragraphIndex = 0;
        var delay = 0.0;

        // Generate story text - loop through available content
        while(story.canContinue) {

            // Get ink to generate the next paragraph
            var paragraphText = story.Continue();

            // Create paragraph element
            var paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = paragraphText;
            storyContainer.appendChild(paragraphElement);

            // Fade in paragraph after a short delay
            showAfter(delay, paragraphElement);

            delay += 200.0;
        }

        // Create HTML choices from ink choices
        story.currentChoices.forEach(function(choice) {

            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            storyContainer.appendChild(choiceParagraphElement);

            // Fade choice in after a short delay
            showAfter(delay, choiceParagraphElement);
            delay += 200.0;

            // Click on choice
            var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
            choiceAnchorEl.addEventListener("click", function(event) {

                // Don't follow <a> link
                event.preventDefault();

                // Remove all existing choices
                var existingChoices = storyContainer.querySelectorAll('p.choice');
                for(var i=0; i<existingChoices.length; i++) {
                    var c = existingChoices[i];
                    c.parentNode.removeChild(c);
                }

                // Tell the story where to go next
                story.ChooseChoiceIndex(choice.index);

                // Aaand loop
                continueStory();
            });
        });

        scrollToBottom();
    }

    continueStory();

})(storyContent);


