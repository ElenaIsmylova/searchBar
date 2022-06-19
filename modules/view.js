export class View {
    constructor() {
        this.app = document.getElementById('app')

        this.searchLine = this.createElement('div', 'search-line')
        this.searchInput = this.createElement('input', 'search-input')
        this.searchLine.append(this.searchInput)

        this.repoWrapper = this.createElement('div', 'repo-wrapper')
        this.repoList = this.createElement('ul', 'repositories')
        this.repoWrapper.append(this.repoList)

        this.selectReposList = this.createElement('ul', 'selectReposList')

        this.main = this.createElement('div', 'main')
        this.main.append(this.repoWrapper)
        this.main.append(this.selectReposList)

        this.app.append(this.searchLine)
        this.app.append(this.main)
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag)
        if (elementClass) {
            element.classList.add(elementClass)
        }
        return element
    }

    createRepository(repoData) {
        
        const repoElement = this.createElement('li', 'repository')
        repoElement.innerHTML = `<div class='repository-name'>${repoData.name}</div>`
        this.repoList.append(repoElement)
        
        repoElement.addEventListener('click', this.addRepository.bind(this, repoData))
    }  
    
    addRepository(repoData) {
        const selectElement = this.createElement('li', 'selectRepo')
        selectElement.innerHTML = `<div class='repo-content-wrapper'>
                                        <div class='repo-content'>Name: ${repoData.full_name}</div>
                                        <div class='repo-content'>Owner: ${repoData.owner.login}</div>
                                        <div class='repo-content'>Stars: ${repoData.stargazers_count}</div>
                                   </div>`

        const cancelBtn = this.createElement('div', 'cancelBtn')
        cancelBtn.innerHTML = `<span class='cancelBtnLine cancelBtnLine-1'></span>
                               <span class='cancelBtnLine cancelBtnLine-2'></span>`
                               
        selectElement.append(cancelBtn)
        this.selectReposList.append(selectElement)

        cancelBtn.addEventListener('click', () => {
            selectElement.remove()
        })
    }
}
