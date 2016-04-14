//
//  BCMicroLocation.h
//  BlueCatsSDK
//
//  Created by Cody Singleton on 4/8/13.
//
//

#import "BCBeacon.h"

@class BCSite, BCMapPoint;

@interface BCMicroLocation : NSObject <NSCopying>

@property (nonatomic, copy) NSArray *sites;
@property (nonatomic, copy) NSDictionary *beaconsForSiteID;
@property (nonatomic, copy) NSDate *timestamp;

- (id)initWithSites:(NSArray *)sites andBeacons:(NSArray *)beacons;

- (NSArray *)beacons;

- (NSArray *)sitesWithBeaconsInProximity:(BCProximity)proximity;

- (NSArray *)sitesWithCategoriesInProximity:(BCProximity)proximity;

- (NSArray *)beaconsForSite:(BCSite *)site
                  proximity:(BCProximity)proximity;

- (NSArray *)beaconsInProximity:(BCProximity)proximity;

- (NSArray *)categoriesForSite:(BCSite *)site
                     proximity:(BCProximity)proximity;

- (BCMapPoint *)mapPointForSite:(BCSite *)site;

- (NSArray *)allCategories;

@end
