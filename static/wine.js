var app = Vue.createApp({

    data() {
        return {
                message: 'Adams Wine List',
                sortOrder: 'Producent',
                sortOptions: ['Producer', 'Region', 'Year'],
                wines : [
                    {Type:'Bubbel',Year:1919,Producer:'N.V',Brand:'Arnaud Lambert',Grapes:['Chenin Blanc', 'Chardonnay'],Region:'Brézé'},
                    {Type:'Bubbel',Year:2014,Producer:'Alto Alella',Brand:'Mirgin Opus',Grapes:['Chardonnay', 'Pansa Blanca'],Region:'Katalonien'},
                    {Type:'Bubbel',Year:2004,Producer:'Ulla Bella',Brand:'Mirgin Opus',Grapes:['Chardonnay', 'Pansa Blanca'],Region:'Champagn'},
                ],
                open:  false
            }
        }, created () {
        // fetch the data when the view is created and the data is
        // already being observed
        //          this.loadWine()
    },
        computed: {
            orderedBySel: function () {
                //      console.log(":>", this.sortOrder, this.wines)
                    var key = this.sortOrder;
                        return this.wines.sort(
                    function(a,b){
                        var x = a[key] < b[key] ? -1 : 1;
                        //          console.log(":->", key, a[key], b[key], x)
                        return x;
                    }
                );
            }
        },
        methods: {
            async loadWine() {
                try {
                    const response  = await fetch('/WineList.json' + '?' + new Date().getTime())
                    const data      = await response.json()
                    
                    console.log("data:", data);
                    
                    this.wines = data
            
                } catch (error) {
                    console.error(error)
                    }
            },
            rowClicked() {
                console.log("rowClicked")
            }
        },
    }
    );
    
    app.mount('#app');
    