export class Search {

    constructor(view) {
        this.view = view
        this.view.searchInput.addEventListener('keyup', this.debounce(this.loadRepositories.bind(this), 1000))
    }

    async loadRepositories() {
        const searchValue = this.view.searchInput.value
        if(searchValue) {
            return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=5`).then(res => {
                if(res.ok) {
                    this.view.repoList.innerHTML = ''
                    res.json().then(res=>{
                        res.items.forEach(repository => this.view.createRepository(repository))
                    })
                }
            })
        } else {
            this.view.repoList.innerHTML = ''
        }
    }

    debounce(func, wait, immediate) {
        let timeout
        return function() {
            const context = this, args = arguments
            const later = function() {
                timeout = null
                if(!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if(callNow) func.apply(context, args)
        }
    }
}
