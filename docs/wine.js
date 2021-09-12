var vue_det = Vue.createApp({
    

    data() {
      return {
        versionSet: 2.3,
        message: 'Wine List',
        sortOrder: 'Sort by',
        sortOptions: ['Producer', 'Region', 'Type', 'Year'],
        // wineClicked: false,
        selectedWine: [],
        info: 'This is good',
        filter: '',
        selectType: '',
        name: '',
        vintageField: '',
        producerField: '',
        aboutField: '',
        vinificationField: '',
        wines : [
          {Type:'Bubbel',Year:2019,Producer:'N.V',Name:'Arnaud Lambert',Grapes:['Chenin Blanc', 'Chardonnay'],Region:'Brézé', wineClicked: false},
          {Type:'Bubbel',Year:2014,Producer:'Alto Alella',Name:'Mirgin Opus',Grapes:['Chardonnay', 'Pansa Blanca'],Region:'Katalonien', wineClicked: false},
          {Type:'Bubbel',Year:2004,Producer:'Ulla Bella',Name:'Mirgin Opus',Grapes:['Chardonnay', 'Pansa Blanca'],Region:'Champagne', wineClicked: false},
          {Type:'Red',Year:2019,Producer:'Crystallum',Name:'Cuvée Cinema',Grapes:['Pinot Noir'],Region:'Swartland', wineClicked: false},
        ],
      }
    }, created () {
  // fetch the data when the view is created and the data is
  // already being observed
           this.loadWine();
  },
  computed: {
    orderedBySel: function () {      
//      console.log(":>", this.sortOrder, this.wines)
      var key = this.sortOrder;
      return this.wines.sort(
        function(a,b){           
          var x = a[key] < b[key] ? -1 : 1; 
//          console.log(":->", key, a[key], b[key], x)

          return x; 
      }
      );            
    },

    filteredWines() {
      return this.orderedBySel.filter(wine => {
        const wineName = wine.Name.toString().toLowerCase();
        const wineProducer = wine.Producer.toLowerCase();
        const wineGrape = wine.Grapes.toLowerCase();
        const searchTerm = this.filter.toLowerCase();
  
        return wineName.includes(searchTerm) ||
          wineProducer.includes(searchTerm) ||
          wineGrape.includes(searchTerm);
      });
    }
  },

    searchedWine: function ()  {
      return wines.value.filter((wine) => {
        return (
          wine.Name
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      }
      );
  },
  

  methods: {
    async loadWine() {
      try {
        const response  = await fetch('./WineList.json' )//+ '?' + new Date().getTime())
        const data      = await response.json()

        this.wines = data

        console.log("data:", data);


      } catch (error) {
        console.error(error)
      }
    },

    displayGrapes: function(wine) {
      return wine.Grapes.join(', ');      
    },

    submitForm(evt) {
      evt.preventDefault();
      console.log(this.nameField);
      console.log(this.selectType);
    },
     
    rowClicked: function(wine) {
      this.selectedWine.WineClicked = !this.selectedWine.WineClicked
      wine.WineClicked = !wine.WineClicked
      this.selectedWine = wine 

      // this.info = getInfo(wine)
      },
      
      // getInfo: function(wine) {
      //   v-for="wine in wines"
      // }
    },
    beforeMount(){
      this.loadWine;
    },
    
  }
);

vue_det.mount('#app');
