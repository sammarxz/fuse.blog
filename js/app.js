const itemComponent = {
    template: `
        <div class="item">
            <span class="item-category">{{ item.category }}</span>
            <a v-bind:href="item.url" class="item-title" target="_blank" rel="nofollow">
                {{ item.title }}
            </a>
            <div class="item-vote">
                <button v-on:click="upvote(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><g data-name="Layer 2"><g data-name="arrow-up"><rect width="20" height="20" transform="rotate(90 12 12)" opacity="0"/><path d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1 2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1zM8 14h7.9L12 9.18z"/></g></g></svg>
                </button>
                <span class="item-vote-count">{{ item.votes }}</span>
            </div>
        </div>
    `,
    props: ['item', 'items'],
    methods: {
        upvote(itemId) {
            const item = this.items.find(
                item => item.id === itemId
            );
            item.votes++;
        }
    }
}

const app = new Vue({
    el: '#app',
    data: {
        isLight: false,
        pageTitle: 'Daily curated links from designers to designers:',
        items: null
    },
    mounted() {
        $.getJSON('./data.json', json => {
            this.items = json.items
        });
    },
    components: {
        'item-component': itemComponent
    },
    computed: {
        sortedSubmissions() {
            return this.items.sort((a,b) => {
                return b.votes - a.votes
            })
        }
    },
    methods: {
        changeTheme() {
            this.isLight = !this.isLight;
            document.body.classList.toggle("light", this.isLight);
        }
    }
});