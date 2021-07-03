import Vue from 'nativescript-vue';

import SchoolLessonDepot from './components/App';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <SchoolLessonDepot />
        </Frame>`,

    components: {
        SchoolLessonDepot
    }
}).$start();