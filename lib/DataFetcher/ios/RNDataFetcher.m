
#import "RNDataFetcher.h"

@implementation RNDataFetcher

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(fetch: (NSString *) url resolver: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    NSURLSessionDataTask *dataTask = [session dataTaskWithURL:[NSURL URLWithString:url] completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error || !data) {
            reject(@"data_fetching", @"Can't fetch data", error);
            return;
        }
        NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        if (![json objectForKey:@"locations"]) {
            reject(@"data_fetching", @"No 'locations' field", nil);
            return;
        }
        if (![json objectForKey:@"updated"]) {
            reject(@"data_fetching", @"No 'updated' field", nil);
            return;
        }
        resolve(@{@"locations": [json objectForKey:@"locations"],
                  @"updated": [json objectForKey:@"updated"]});
    }];
    [dataTask resume];
}
@end
