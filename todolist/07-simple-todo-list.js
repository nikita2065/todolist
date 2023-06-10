const todo = {
    action(e) {
        const target = e.target;
        if (target.classList.contains('todo__action')) {
            const action = target.dataset.todoAction;
            const elemItem = target.closest('.todo__item');
            if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
                confirm('Вы точно хотите удалить задачу?')
                elemItem.remove();
            } else {
                elemItem.dataset.todoState = action;
            }
            this.save();
        } else if (target.classList.contains('todo__add')) {
            const select = document.querySelector('select');
            const selectedValue = select.value;
            console.log(selectedValue);
            this.add();
            this.save();
        }

    },
    add() {
        const elemText = document.querySelector('.todo__text');
        if (elemText.disabled || !elemText.value.length || elemText.value === " ") {
            alert('Пустой текст задачи!')
            return;
        }
        document.querySelector('.todo__items').insertAdjacentHTML('afterbegin', this.create(elemText.value));
        elemText.value = '';
        document.dispatchEvent(new Event('todo-item-add'));
    },
    create(text) {
        const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
        return `<li class="todo__item" data-todo-state="active">
      <span class="todo__task">
      <span class=" todo__task">${text}</span>
      <span class=" todo__task">${this.selectedValue}</span>
             <span class="todo__date" data-todo-date="${date}">
          <span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
        </span>
      </span>
      <span class="todo__action todo__action_restore" data-todo-action="active"></span>
      <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
      <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
    },
    init() {
        const fromStorage = localStorage.getItem('todo');
        if (fromStorage) {
            document.querySelector('.todo__items').innerHTML = fromStorage;
        }
        document.querySelector('.todo__options').addEventListener('change', this.update);
        document.addEventListener('click', this.action.bind(this));
    },
    update() {
        const option = document.querySelector('.todo__options').value;
        document.querySelector('.todo__items').dataset.todoOption = option;
        document.querySelector('.todo__text').disabled = option !== 'active';
    },
    save() {
        localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
    }
};

todo.init();