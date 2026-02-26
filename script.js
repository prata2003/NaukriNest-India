const jobs = [
  {title:"Software Engineer", company:"TCS", location:"Bengaluru", category:"IT", experience:"Fresher", salary:450000, description:"Work on enterprise software solutions."},
  {title:"Data Analyst", company:"Infosys", location:"Pune", category:"IT", experience:"Mid", salary:800000, description:"Analyze data & create reports."},
  {title:"Product Designer", company:"Zomato", location:"Gurgaon", category:"Design", experience:"Mid", salary:1200000, description:"Design modern UI/UX."},
  {title:"Marketing Manager", company:"Flipkart", location:"Mumbai", category:"Marketing", experience:"Senior", salary:1500000, description:"Lead digital campaigns."},
  {title:"Financial Analyst", company:"HDFC Bank", location:"Chennai", category:"Finance", experience:"Mid", salary:900000, description:"Financial planning & reporting."},
  {title:"Backend Developer", company:"Wipro", location:"Hyderabad", category:"IT", experience:"Senior", salary:1400000, description:"Develop scalable APIs."}
];

let currentPage=1;
const jobsPerPage=4;

const searchTitle=document.getElementById("searchTitle");
const searchLocation=document.getElementById("searchLocation");
const categoryFilter=document.getElementById("categoryFilter");
const experienceFilter=document.getElementById("experienceFilter");
const salaryFilter=document.getElementById("salaryFilter");

document.querySelectorAll("input,select").forEach(el=>{
  el.addEventListener("input",()=>{currentPage=1;displayJobs();});
});

document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("dark");
};

function displayJobs(){
  const container=document.getElementById("jobContainer");
  const emptyState=document.getElementById("emptyState");
  const pagination=document.getElementById("pagination");
  container.innerHTML="";
  pagination.innerHTML="";

  let filtered=jobs.filter(job=>{
    let salaryMatch=true;
    if(salaryFilter.value){
      const [min,max]=salaryFilter.value.split("-").map(Number);
      salaryMatch=job.salary>=min && job.salary<=max;
    }

    return job.title.toLowerCase().includes(searchTitle.value.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.value.toLowerCase()) &&
      (categoryFilter.value===""||job.category===categoryFilter.value) &&
      (experienceFilter.value===""||job.experience===experienceFilter.value) &&
      salaryMatch;
  });

  if(filtered.length===0){
    emptyState.style.display="block";
  }else{
    emptyState.style.display="none";
  }

  const start=(currentPage-1)*jobsPerPage;
  const paginated=filtered.slice(start,start+jobsPerPage);

  paginated.forEach(job=>{
    const card=document.createElement("div");
    card.className="job-card";

    card.innerHTML=`
      <div class="company-logo">${job.company[0]}</div>
      <h3>${job.title}</h3>
      <p><strong>${job.company}</strong></p>
      <p>📍 ${job.location}</p>
      <p>💼 ${job.experience}</p>
      <p>💰 ₹${job.salary.toLocaleString()}</p>
      <div class="btn-group">
        <button class="view-btn" onclick="openModal('${job.title}','${job.company}','${job.description}')">View</button>
        <button class="save-btn" onclick="saveJob(this,'${job.title}')">Save</button>
      </div>
    `;
    container.appendChild(card);
  });

  for(let i=1;i<=Math.ceil(filtered.length/jobsPerPage);i++){
    const btn=document.createElement("button");
    btn.innerText=i;
    btn.onclick=()=>{currentPage=i;displayJobs();};
    pagination.appendChild(btn);
  }
}

function openModal(title,company,desc){
  document.getElementById("jobModal").style.display="flex";
  document.getElementById("modalDetails").innerHTML=
    `<h2>${title}</h2><h4>${company}</h4><p>${desc}</p>`;
}

function closeModal(){
  document.getElementById("jobModal").style.display="none";
}

function saveJob(btn,title){
  btn.classList.toggle("saved");
  btn.innerText=btn.classList.contains("saved")?"Saved":"Save";
  localStorage.setItem(title,"saved");
}

function resetFilters(){
  document.querySelectorAll("input,select").forEach(el=>el.value="");
  displayJobs();
}

displayJobs();