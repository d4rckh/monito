function closeModal() {
    document.getElementById("generalModal").classList.remove("is-active")
}

class Modal {
    constructor(title, description) {
        this.title = title
        this.description = description
    
        this.modal = document.getElementById("generalModal")
        this.modalTitle = document.getElementById("generalModal-title")
        this.modalDescription = document.getElementById("generalModal-description")
    }

    show() {
        this.modalTitle.innerHTML = this.title
        this.modalDescription.innerHTML = this.description
        this.modal.classList.add("is-active")
    }

    hide() {
        closeModal()
    }

}