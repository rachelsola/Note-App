customElements.define('delete-button', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            .delete-btn {
                position: absolute;
                top: 5px;
                right: 5px;
                color: #dc3545;
                cursor: pointer;
            }
        </style>
        <span class="delete-btn">❌</span>
        `;
        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete'));
        });
    }
});

customElements.define('note-date', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
        const createdAt = this.getAttribute('created-at');
        const formattedDate = new Date(createdAt).toLocaleString();
        this.shadowRoot.innerHTML = `
        <style>
            .note-date {
                font-size: 0.8em;
                color: #666;
                margin-top: 5px;
            }
        </style>
        <span class="note-date">Created at: ${formattedDate}</span>
        `;
    }
});

customElements.define('note-item', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
        const title = this.getAttribute('title');
        const body = this.getAttribute('body');
        const createdAt = this.getAttribute('created-at');
        const backgroundColor = this.getAttribute('background-color') || '#FFEFFD';
        this.shadowRoot.innerHTML = `
        <style>
            .note {
                border: 1.3px solid #103037;
                padding: 10px;
                border-radius: 10px;
                background-color: ${backgroundColor};
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: transform 0.3s;
                max-width: 300px; 
                margin: 10px; 
                display: inline-block; 
                vertical-align: top; 
                position: relative; 
            }
            .note:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 8px rgba(0,0,0,0.1);
            }
            h3 {
                margin-top: 0;
                color: ##551e48;
                font-size: 1.2em; 
                margin-bottom: 10px; 
            }
            p {
                margin-bottom: 0;
                font-size: 1em; 
                color: #333; 
            }
            .delete-btn {
                position: absolute;
                top: 5px;
                right: 5px;
                color: #5b1119;
                cursor: pointer;
            }
        </style>
        <div class="note">
            <h3>${title}</h3>
            <p>${body}</p>
            <delete-button></delete-button>
            <note-date created-at="${createdAt}"></note-date>
        </div>
        `;
        this.shadowRoot.querySelector('delete-button').addEventListener('delete', () => {
            this.remove();
        });
    }
});

const container = document.querySelector('.container');

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    let isValid = true;

    if (title.trim() === '') {
        isValid = false;
        document.querySelector('#title').classList.add('error');
    } else {
        document.querySelector('#title').classList.remove('error');
    }

    if (body.trim() === '') {
        isValid = false;
        document.querySelector('#body').classList.add('error');
    } else {
        document.querySelector('#body').classList.remove('error');
    }

    if (isValid) {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('title', title);
        noteItem.setAttribute('body', body);
        noteItem.setAttribute('created-at', new Date().toISOString());
        container.appendChild(noteItem);
        document.querySelector('.form').reset();
    }
});

document.querySelector('#title').addEventListener('input', function() {
    if (this.value.trim() === '') {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
    }
});

document.querySelector('#body').addEventListener('input', function() {
    if (this.value.trim() === '') {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
    }
});

  
  window.addEventListener('DOMContentLoaded', function() {
      const notesData = [
          {
            id: "notes-jT-jjsyz61J8XKiI",
            title: "Welcome to Notes, Dimas!",
            body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
            createdAt: "2022-07-28T10:03:12.594Z",
            archived: false,
          },
          {
            id: "notes-aB-cdefg12345",
            title: "Meeting Agenda",
            body: "Discuss project updates and assign tasks for the upcoming week.",
            createdAt: "2022-08-05T15:30:00.000Z",
            archived: false,
          },
          {
            id: "notes-XyZ-789012345",
            title: "Shopping List",
            body: "Milk, eggs, bread, fruits, and vegetables.",
            createdAt: "2022-08-10T08:45:23.120Z",
            archived: false,
          },
          {
            id: "notes-1a-2b3c4d5e6f",
            title: "Personal Goals",
            body: "Read two books per month, exercise three times a week, learn a new language.",
            createdAt: "2022-08-15T18:12:55.789Z",
            archived: false,
          },
          {
            id: "notes-LMN-456789",
            title: "Recipe: Spaghetti Bolognese",
            body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
            createdAt: "2022-08-20T12:30:40.200Z",
            archived: false,
          },
          {
            id: "notes-QwErTyUiOp",
            title: "Workout Routine",
            body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
            createdAt: "2022-08-25T09:15:17.890Z",
            archived: false,
          },
          {
            id: "notes-abcdef-987654",
            title: "Book Recommendations",
            body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
            createdAt: "2022-09-01T14:20:05.321Z",
            archived: false,
          },
          {
            id: "notes-zyxwv-54321",
            title: "Daily Reflections",
            body: "Write down three positive things that happened today and one thing to improve tomorrow.",
            createdAt: "2022-09-07T20:40:30.150Z",
            archived: false,
          },
          {
            id: "notes-poiuyt-987654",
            title: "Travel Bucket List",
            body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
            createdAt: "2022-09-15T11:55:44.678Z",
            archived: false,
          },
          {
            id: "notes-asdfgh-123456",
            title: "Coding Projects",
            body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
            createdAt: "2022-09-20T17:10:12.987Z",
            archived: false,
          },
          {
            id: "notes-5678-abcd-efgh",
            title: "Project Deadline",
            body: "Complete project tasks by the deadline on October 1st.",
            createdAt: "2022-09-28T14:00:00.000Z",
            archived: false,
          },
          {
            id: "notes-9876-wxyz-1234",
            title: "Health Checkup",
            body: "Schedule a routine health checkup with the doctor.",
            createdAt: "2022-10-05T09:30:45.600Z",
            archived: false,
          },
          {
            id: "notes-qwerty-8765-4321",
            title: "Financial Goals",
            body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
            createdAt: "2022-10-12T12:15:30.890Z",
            archived: false,
          },
          {
            id: "notes-98765-54321-12345",
            title: "Holiday Plans",
            body: "Research and plan for the upcoming holiday destination.",
            createdAt: "2022-10-20T16:45:00.000Z",
            archived: false,
          },
          {
            id: "notes-1234-abcd-5678",
            title: "Language Learning",
            body: "Practice Spanish vocabulary for 30 minutes every day.",
            createdAt: "2022-10-28T08:00:20.120Z",
            archived: false,
          },
        ];
        
  
    notesData.forEach(function(note) {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);
        container.appendChild(noteItem);
    });
  });

  
