const App = Vue.createApp({
    data(){
        return{
            taskDone: [],
            currentTask: null,
            idIndex: 0
        }
    },
    computed:{
        containDoneTasks(){
            return this.taskDone.length > 0
        },
        dateToday(){
            return this.recoveryDate().toLocaleDateString();
        },
        dayOfWeek(){
            return this.todayIs(this.recoveryDate().getDay());
        },
        currentTaskIsNull(){
             return this.currentTask !== null;
        },
        
    },
    mounted() {
      
    },
    methods: {
        todayIs(day){
            const week = ['Sunday ','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']
            return week[day];
        },
        recoveryDate(){
            return new Date();
        },
        recoveryTimeNow(){
            return `${this.recoveryHours()}:${this.recoveryMinutes()}`
        },
        startTask(){
            this.currentTask = this.createNewTask();
        },
        createNewTask(){
            return {
                id: this.idGenerator(),
                inputBox:'',
                description:'No content description',
                timeStart: this.recoveryTimeNow(),
            }
        },
        submitContent(){
            if (this.currentTask.inputBox !== '') {
                this.currentTask.description = this.currentTask.inputBox;
            }
            this.currentTask.inputBox = '';
        },
        recoveryHours(){
            return this.recoveryDate().getHours() < 10
            ? `0${this.recoveryDate().getHours()}`
            : this.recoveryDate().getHours()
        },
        recoveryMinutes(){
            return this.recoveryDate().getMinutes() < 10
            ? `0${this.recoveryDate().getMinutes()}`
            : this.recoveryDate().getMinutes()
        },
        donetask(){
            this.addTaskDone();
           this.currentTask = this.createNewTask();
        },
        addTaskDone(){
            this.taskDone.push(this.createTaskDone())
        },
        createTaskDone(){
            return {
                id: this.currentTask.id,
                inputBox:'',
                description:this.currentTask.description,
                timeStart: this.currentTask.timeStart,
                timeEnd: this.recoveryTimeNow()
            }
        },
        idGenerator(){
            this.idIndex += 1;
            return this.idIndex;
        },
        stopTask(){
            this.addTaskDone();
            this.currentTask = null;
        },
        editContent(task){
            if (task.inputBox !== '') {
                task.description = task.inputBox;
            }
            task.inputBox = '';
        }
    },
});

App.mount('#assignment')


