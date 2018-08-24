new Vue({
  el: '#app',
  data: {
    accountAddress: '',
    contractAddress: '',
    tokenAddress: '',
    amount: '',
    password: '',
    balance: '0',
    allowance: '0',
    message: '',
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      var source = localStorage.getItem('data');
      if (source) {
        var data = JSON.parse(source);
        Object.keys(data)
          .filter(i => i !== 'message')
          .forEach(key => this.$data[key] = data[key]);
      }
    },
    save() {
      var data = Object.assign({}, this.$data, {
        password: '',
        amount: '',
      });
      var source = JSON.stringify(data);
      localStorage.setItem('data', source);
    },
    approve() {
      this.save();
    },
    submit() {
      this.save();
    },
  },
});
