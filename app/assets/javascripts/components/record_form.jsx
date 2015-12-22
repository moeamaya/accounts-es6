class RecordForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: '',
      date: '',
      amount: ''
    };
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({[`${name}`]: e.target.value});
  }

  valid() {
    return this.state.title && this.state.date && this.state.amount;
  }

  handleSubmit(e) {
    e.preventDefault();
    $.post('', {record: this.state}, (result) => {
      this.props.handleNewRecord(result);
      this.setState({
        title: '',
        date: '',
        amount: ''
      })
    });
  }

  render() {
    return (
      <form className="form-inline col-md-12" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
        </div>
        <input type="submit" className="btn btn-primary" disabled={!this.valid()} value="Create record" />
      </form>
    )
  }

}