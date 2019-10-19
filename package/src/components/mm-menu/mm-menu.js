import bus from 'shared/bus.js'
import firestore from 'shared/mm-firestore.js'

export default {
  name: 'mm-menu',
  props: {
    contentElement: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 250
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },  
  data: function () {
    return {
      visible : false
    }
  },
  firestore() {
    return {
        // Collection
        apis: firestore.collection('apis'),
    }
  }
  ,methods: {
  	expand: function () {    
        this.visible = true;
  	    this.$el.style.width = this.size + "px";
  	    if(document.getElementById(this.contentElement))
          document.getElementById(this.contentElement).style.marginLeft = this.size + "px";
  	},
  	collapse: function() {
  	    this.$el.style.width = "40px";
  	    if(document.getElementById(this.contentElement))
          document.getElementById(this.contentElement).style.marginLeft = "40px";
        this.visible = false;
  	},
    init: function(){
      if(document.getElementById(this.contentElement)) {
        document.getElementById(this.contentElement).style.transition = "margin-left .5s";
        document.getElementById(this.contentElement).style.padding = "20px";
      }
      
      if(this.visible)
        this.expand();
      else
        this.collapse();
    },
    logout: function(){
      bus.$emit('logout');
    }

  },
  mounted: function () {
    this.init();
  },
  created: function () {
    this.visible = this.expanded;
    bus.$on('collapse', this.collapse );
    bus.$on('expand', this.expand );
  }
}
