using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using Sitecore.Data;

namespace AfternoonDelight.Feature.Media
{
    public class Templates
    {
        [StructLayout(LayoutKind.Sequential, Size = 1)]
        public struct HotspotImage
        {
            public static ID ID = ID.Parse("{A1C34EC2-469A-4142-A431-C05D1718FE9C}");

            [StructLayout(LayoutKind.Sequential, Size = 1)]
            public struct Fields
            {
                public static readonly ID Image = new ID("{C19FDF45-F4D4-4F0E-B14A-8A1951C02CB3}");
                public static readonly ID ImageTitle = new ID("{C17DF2C0-3DEC-41E3-982D-CB7EBE382AC7}");
                public static readonly ID ImageDescription = new ID("{2E9D5C09-883E-441C-A827-CFC02B9B57EC}");
            }
        }

        [StructLayout(LayoutKind.Sequential, Size = 1)]
        public struct Hotspot
        {
            public static ID ID = ID.Parse("{011011F0-D6AE-41C0-8AED-8C8EA3236113}");

            [StructLayout(LayoutKind.Sequential, Size = 1)]
            public struct Fields
            {
                public static readonly ID LocationX = new ID("{90528B22-309F-47DF-A8E2-EF24DECC8F69}");
                public static readonly ID LocationY = new ID("{19E3DC1E-A59C-4C05-9498-9A1C3FA02B21}");
                public static readonly ID Title = new ID("{DCA79574-87FA-4D44-8AD8-B65E62ED953E}");
                public static readonly ID Icon = new ID("{DD0859C6-6461-4FF4-8B09-D32E6C122B7D}");
                public static readonly ID Description = new ID("{BF2A7EDF-D48B-45D4-B340-0FAA3A4921DE}");
            }
        }
    }
}