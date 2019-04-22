const assert = require('assert');
const testMe = require('./index.js');
const should = require('chai').should();

describe('getHour returns the hour from the timestamp', function() {
  it('should convert "3/11/2016 02:02:58" to 2', function() {
    assert.equal(2, testMe.getHour('3/11/2016 02:02:58'));
  });
});

describe('getResultSet returns a subset of clicks', function() {
  beforeEach(function() {
    let data;
    let result;
  });

  it('should return the most expensive click per hour for the same IP', function() {
    data = [
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 07:03:15', 'amount': 12 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 07:04:22', 'amount': 3 },
    ];
    result = testMe.getResultSet(data);
    assert.equal(12, result[0].amount);
  });

  it('should return the first click if the IP, time period, & amount are equal', function() {
    data = [
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 07:03:15', 'amount': 12 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 07:06:22', 'amount': 12 },
    ];
    result = testMe.getResultSet(data);
    assert.equal('3/11/2016 07:03:15', result[0].timestamp);
  });

  it('should return ten clicks max of the same IP regardless of time/amount', function() {
    data = [
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 01:00:00', 'amount': 1 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 02:00:00', 'amount': 2 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 03:00:00', 'amount': 3 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 04:00:00', 'amount': 4 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 05:00:00', 'amount': 5 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 06:00:00', 'amount': 6 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 07:00:00', 'amount': 7 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 08:00:00', 'amount': 8 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 09:00:00', 'amount': 9 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 10:00:00', 'amount': 10 },
      { 'ip': '22.22.22.22', 'timestamp': '3/11/2016 11:00:00', 'amount': 11 },
    ];
    result = testMe.getResultSet(data);
    result.should.have.length(10);
  });
});
