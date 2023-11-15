async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
 
  const learnersData = 'http://localhost:3003/api/learners';
  const mentorsNames = 'http://localhost:3003/api/mentors';
  
  const axiosPromises = [
    axios.get(learnersData),
    axios.get(mentorsNames)
  ];
  
  Promise.all(axiosPromises)
  .then(res => {
    const learnerData = res[0].data
    const mentorData = res[1].data

    const cardsContainer = document.querySelector('.cards')
  
    for(let idx = 0; idx < learnerData.length; idx++){
      const whichLearner = learnerData[idx]
      const learnerCard = buildLearnerCard(whichLearner, mentorData)
      cardsContainer.appendChild(learnerCard)
    }

    document.querySelector('p.info').textContent = `No learner is selected`
    
  
    function buildLearnerCard(learner, mentors){
      const card = document.createElement('div')
      card.classList.add('card')
      card.style.width = '267.81px'
    
      

      if (learner && learner.fullName) {
       const nameP = document.createElement('h3');
       nameP.textContent = `${learner.fullName}`
       nameP.id = `learnerName_${learner.id}`
       card.appendChild(nameP)
     }
    
    if (learner && learner.email) {
      const emailP = document.createElement('div');
      emailP.textContent = `${learner.email}`;
      card.appendChild(emailP);
    }
     
    if (learner && learner.mentors) {
      const mentorsP = document.createElement('h4')
      mentorsP.classList.add('closed')
      mentorsP.textContent = 'Mentors';
      
      mentorsP.addEventListener('click', () => {
        const mentorsList = card.querySelector('ul');
        mentorsList.style.display = mentorsList.style.display === 'none' ? 'block' : 'none';
      
        document.querySelectorAll('.card.selected').forEach((selectedCard) => {
          selectedCard.classList.remove('selected');
        });

        card.classList.add('selected');
        document.querySelector('p.info').textContent = `The selected learner is ${learner.fullName}`;
      
        mentorsP.classList.toggle('closed');
        mentorsP.classList.toggle('open');
      });
  
      const matchingMentors = mentors.filter(mentor => learner.mentors.includes(mentor.id));
  
      const mentorsList = document.createElement('ul');
      mentorsList.style.display = 'none'
      
      mentorsP.appendChild(mentorsList)
      
  
      if(matchingMentors.length > 0){
        matchingMentors.forEach(mentor => {
          const mentorsName = document.createElement('li')
          mentorsName.textContent = `${mentor.firstName} ${mentor.lastName}`
          mentorsList.appendChild(mentorsName)
        })
      } else {
        console.log("Mentor not found")
      }
        card.appendChild(mentorsP)
    }
    
    const originalNameContent = learner.fullName

    card.addEventListener('click', (evt) => {
      const isMentorsListClick = evt.target.closest('h4') !== null;
      
      if (!isMentorsListClick) {
        const isSelected = card.classList.contains('selected')
        document.querySelectorAll('.card.selected').forEach(selectedCard => {
          selectedCard.classList.remove('selected');
          selectedCard.querySelector('h3').textContent = selectedCard.originalNameContent
          
          
        
        })

        if (!isSelected) {
          document.querySelectorAll('.card.selected').forEach((selectedCard) => {
            selectedCard.classList.remove('selected');
          });
            card.classList.add('selected');
            document.querySelector('p.info').textContent = `The selected learner is ${learner.fullName}`;
            const selectedName = document.getElementById(`learnerName_${learner.id}`);

        if (selectedName) {
              selectedName.textContent = `${learner.fullName}, ID ${learner.id}`;
            }
          } else {
            document.querySelector('p.info').textContent = `No learner is selected`;
        
        const originalName = document.getElementById(`learnerName_${learner.id}`)
        if (originalName) {
          originalName.textContent = originalNameContent;
          }
        }
        card.originalNameContent = learner.fullName;
      }
    });
    
      return card
    
    }
  
  
  })
  .catch(error => {
    console.error('Error during requests:', error)
  })



 


  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
