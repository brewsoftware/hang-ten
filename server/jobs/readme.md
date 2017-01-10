Parse platform - tasks/jobs go in here.

Parse.Cloud.job("myJob", function(request, status) {
  // the params passed through the start request
  var params = request.params;
  // Headers from the request that triggered the job
  var headers = request.headers;

  // get the parse-server logger
  var log = request.log;

  // Update the Job status message
  status.message("I just started");
  doSomethingVeryLong().then(function(result) {
    // Mark the job as successful
    // success and error only support string as parameters
    status.success("I just finished");
  }, function(error) {
    // Mark the job as errored
    status.error("There was an error");
  })
});
