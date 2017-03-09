"""
==============================================================================
Program: MergeCountsAndLocation.py
 Author: Kyle Reese Almryde
   Date: 04/14/2015

 Description:



==============================================================================
"""

import sys
import json


def getZipCounts(fname):
    """
    Using a FreqDist object, count the number of zipcodes in the
    provided file
    """
    counts = {}
    with open(fname) as f:
        counts = json.load(f)
    return counts


def getTopoJsonObj(fname):
    location = {}
    with open(fname) as f:
        location = json.load(f)
    return location


def applyDensities(counts, location, fname):
    obj, chi, geo, prop, zc = 'objects', 'chicago_ZC_Geo', \
                            'geometries', 'properties', 'zipcode'
    size = len(location[obj][chi][geo])
    for i in range(size):
        zipKey = location[obj][chi][geo][i][prop][zc]
        if zipKey in counts.keys():
            location[obj][chi][geo][i][prop]['density'] = counts[zipKey]
        else:
            zipInt = int(zipKey)
            print "Keys dont match! {}, {}".format(repr(zipInt), repr(zipKey))
            return False

    with open(fname, 'w') as f:
        f.write(json.dumps(location))
    return True

# =============================== START OF MAIN ===============================


def main():
    infile_C = sys.argv[1]  # The zipcode counts file
    infile_L = sys.argv[2]  # The filtered geojson file
    outfile_L = sys.argv[3]  # The output filtered topojson file with counts

    print infile_C, infile_L, outfile_L

    counts = getZipCounts(infile_C)
    location = getTopoJsonObj(infile_L)
    applyDensities(counts, location, outfile_L)

if __name__ == '__main__':
    main()
