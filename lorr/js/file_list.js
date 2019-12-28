// A way get a value from another .js file is saving the variable in the browser
FILE_LIST = ["data/raw_data/IDM_AVRider_FUZN--13IDM_9FUZN.csv", 
"data/raw_data/IDM_AVRider_FS--14IDM_8FS.csv", 
"data/raw_data/IDM_AVRider_LinOpt--10IDM_12LinOpt.csv", 
"data/raw_data/IDM_AVRider_BCM--14IDM_8BCM.csv", 
"data/raw_data/IDM_AVRider_LACC--1IDM_21LACC.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--7IDM_15MLYAU1.csv", 
"data/raw_data/IDM_AVRider_FUZO--7IDM_15FUZO.csv", 
"data/raw_data/IDM_AVRider_PI--13IDM_9PI.csv", 
"data/raw_data/IDM_AVRider_AUG--13IDM_9AUG.csv", 
"data/raw_data/IDM_AVRider_LACC--3IDM_19LACC.csv", 
"data/raw_data/IDM_AVRider_FS--4IDM_18FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--0IDM_22MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZO--15IDM_7FUZO.csv", 
"data/raw_data/IDM_AVRider_FS--12IDM_10FS.csv", 
"data/raw_data/IDM_AVRider_FUZO--2IDM_20FUZO.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--8IDM_14MLYAU2.csv", 
"data/raw_data/IDM_AVRider_BCM--22IDM_0BCM.csv", 
"data/raw_data/IDM_AVRider_FS--18IDM_4FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--9IDM_13MLYAU1.csv", 
"data/raw_data/IDM_AVRider_LinOpt--8IDM_14LinOpt.csv", 
"data/raw_data/IDM_AVRider_LinOpt--11IDM_11LinOpt.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--14IDM_8MLYAU1.csv", 
"data/raw_data/IDM_AVRider_FUZO--10IDM_12FUZO.csv", 
"data/raw_data/IDM_AVRider_LACC--16IDM_6LACC.csv", 
"data/raw_data/IDM_AVRider_PI--11IDM_11PI.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--18IDM_4MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZO--5IDM_17FUZO.csv", 
"data/raw_data/IDM_AVRider_FUZO--11IDM_11FUZO.csv", 
"data/raw_data/IDM_AVRider_LACC--8IDM_14LACC.csv", 
"data/raw_data/IDM_AVRider_FUZN--10IDM_12FUZN.csv", 
"data/raw_data/IDM_AVRider_LinOpt--22IDM_0LinOpt.csv", 
"data/raw_data/IDM_AVRider_PI--15IDM_7PI.csv", 
"data/raw_data/IDM_AVRider_FS--20IDM_2FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--15IDM_7MLYAU1.csv", 
"data/raw_data/IDM_AVRider_LinOpt--6IDM_16LinOpt.csv", 
"data/raw_data/IDM_AVRider_AUG--15IDM_7AUG.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--4IDM_18MLYAU2.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--13IDM_9MLYAU2.csv", 
"data/raw_data/IDM_AVRider_AUG--4IDM_18AUG.csv", 
"data/raw_data/IDM_AVRider_FUZO--1IDM_21FUZO.csv", 
"data/raw_data/IDM_AVRider_AUG--11IDM_11AUG.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--0IDM_22MLYAU1.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--22IDM_0MLYAU2.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--12IDM_10MLYAU1.csv", 
"data/raw_data/IDM_AVRider_FUZO--14IDM_8FUZO.csv", 
"data/raw_data/IDM_AVRider_AUG--5IDM_17AUG.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--3IDM_19MLYAU1.csv", 
"data/raw_data/IDM_AVRider_AUG--7IDM_15AUG.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--2IDM_20MLYAU2.csv", 
"data/raw_data/IDM_AVRider_PI--10IDM_12PI.csv", 
"data/raw_data/IDM_AVRider_BCM--3IDM_19BCM.csv", 
"data/raw_data/IDM_AVRider_LinOpt--17IDM_5LinOpt.csv", 
"data/raw_data/IDM_AVRider_BCM--11IDM_11BCM.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--16IDM_6MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZN--15IDM_7FUZN.csv", 
"data/raw_data/IDM_AVRider_FS--9IDM_13FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--6IDM_16MLYAU1.csv", 
"data/raw_data/IDM_AVRider_LinOpt--4IDM_18LinOpt.csv", 
"data/raw_data/IDM_AVRider_FUZN--0IDM_22FUZN.csv", 
"data/raw_data/IDM_AVRider_FS--19IDM_3FS.csv", 
"data/raw_data/IDM_AVRider_FUZO--6IDM_16FUZO.csv", 
"data/raw_data/IDM_AVRider_FUZN--3IDM_19FUZN.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--17IDM_5MLYAU1.csv", 
"data/raw_data/IDM_AVRider_FUZN--8IDM_14FUZN.csv", 
"data/raw_data/IDM_AVRider_AUG--6IDM_16AUG.csv", 
"data/raw_data/IDM_AVRider_FS--3IDM_19FS.csv", 
"data/raw_data/IDM_AVRider_LinOpt--9IDM_13LinOpt.csv", 
"data/raw_data/IDM_AVRider_LACC--7IDM_15LACC.csv", 
"data/raw_data/IDM_AVRider_LACC--20IDM_2LACC.csv", 
"data/raw_data/IDM_AVRider_BCM--16IDM_6BCM.csv", 
"data/raw_data/IDM_AVRider_LinOpt--21IDM_1LinOpt.csv", 
"data/raw_data/IDM_AVRider_FUZN--22IDM_0FUZN.csv", 
"data/raw_data/IDM_AVRider_FUZO--12IDM_10FUZO.csv", 
"data/raw_data/IDM_AVRider_AUG--0IDM_22AUG.csv", 
"data/raw_data/IDM_AVRider_BCM--5IDM_17BCM.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--21IDM_1MLYAU1.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--18IDM_4MLYAU1.csv", 
"data/raw_data/IDM_AVRider_BCM--1IDM_21BCM.csv", 
"data/raw_data/IDM_AVRider_BCM--2IDM_20BCM.csv", 
"data/raw_data/IDM_AVRider_LinOpt--3IDM_19LinOpt.csv", 
"data/raw_data/IDM_AVRider_LACC--6IDM_16LACC.csv", 
"data/raw_data/IDM_AVRider_FUZN--2IDM_20FUZN.csv", 
"data/raw_data/IDM_AVRider_FUZO--19IDM_3FUZO.csv", 
"data/raw_data/IDM_AVRider_FUZO--21IDM_1FUZO.csv", 
"data/raw_data/IDM_AVRider_LACC--17IDM_5LACC.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--5IDM_17MLYAU2.csv", 
"data/raw_data/IDM_AVRider_LinOpt--0IDM_22LinOpt.csv", 
"data/raw_data/IDM_AVRider_LACC--10IDM_12LACC.csv", 
"data/raw_data/IDM_AVRider_PI--3IDM_19PI.csv", 
"data/raw_data/IDM_AVRider_FUZO--20IDM_2FUZO.csv", 
"data/raw_data/IDM_AVRider_PI--20IDM_2PI.csv", 
"data/raw_data/IDM_AVRider_AUG--1IDM_21AUG.csv", 
"data/raw_data/IDM_AVRider_PI--4IDM_18PI.csv", 
"data/raw_data/IDM_AVRider_FUZN--7IDM_15FUZN.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--8IDM_14MLYAU1.csv", 
"data/raw_data/IDM_AVRider_FUZO--22IDM_0FUZO.csv", 
"data/raw_data/IDM_AVRider_FS--15IDM_7FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--22IDM_0MLYAU1.csv", 
"data/raw_data/IDM_AVRider_BCM--8IDM_14BCM.csv", 
"data/raw_data/IDM_AVRider_LACC--11IDM_11LACC.csv", 
"data/raw_data/IDM_AVRider_PI--14IDM_8PI.csv", 
"data/raw_data/IDM_AVRider_FS--2IDM_20FS.csv", 
"data/raw_data/IDM_AVRider_FS--13IDM_9FS.csv", 
"data/raw_data/IDM_AVRider_LinOpt--16IDM_6LinOpt.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--6IDM_16MLYAU2.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--2IDM_20MLYAU1.csv", 
"data/raw_data/IDM_AVRider_LACC--9IDM_13LACC.csv", 
"data/raw_data/IDM_AVRider_FUZO--13IDM_9FUZO.csv", 
"data/raw_data/IDM_AVRider_FUZO--4IDM_18FUZO.csv", 
"data/raw_data/IDM_AVRider_LinOpt--18IDM_4LinOpt.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--10IDM_12MLYAU1.csv", 
"data/raw_data/IDM_AVRider_BCM--19IDM_3BCM.csv", 
"data/raw_data/IDM_AVRider_LACC--2IDM_20LACC.csv", 
"data/raw_data/IDM_AVRider_LACC--13IDM_9LACC.csv", 
"data/raw_data/IDM_AVRider_AUG--17IDM_5AUG.csv", 
"data/raw_data/IDM_AVRider_FUZN--14IDM_8FUZN.csv", 
"data/raw_data/IDM_AVRider_FUZO--16IDM_6FUZO.csv", 
"data/raw_data/IDM_AVRider_BCM--15IDM_7BCM.csv", 
"data/raw_data/IDM_AVRider_FUZN--16IDM_6FUZN.csv", 
"data/raw_data/IDM_AVRider_BCM--18IDM_4BCM.csv", 
"data/raw_data/IDM_AVRider_PI--12IDM_10PI.csv", 
"data/raw_data/IDM_AVRider_LinOpt--14IDM_8LinOpt.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--19IDM_3MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FS--16IDM_6FS.csv", 
"data/raw_data/IDM_AVRider_BCM--6IDM_16BCM.csv", 
"data/raw_data/IDM_AVRider_LinOpt--5IDM_17LinOpt.csv", 
"data/raw_data/IDM_AVRider_FUZO--0IDM_22FUZO.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--10IDM_12MLYAU2.csv", 
"data/raw_data/IDM_AVRider_PI--9IDM_13PI.csv", 
"data/raw_data/IDM_AVRider_PI--18IDM_4PI.csv", 
"data/raw_data/IDM_AVRider_PI--22IDM_0PI.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--5IDM_17MLYAU1.csv", 
"data/raw_data/IDM_AVRider_LinOpt--1IDM_21LinOpt.csv", 
"data/raw_data/IDM_AVRider_PI--8IDM_14PI.csv", 
"data/raw_data/IDM_AVRider_AUG--9IDM_13AUG.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--13IDM_9MLYAU1.csv", 
"data/raw_data/IDM_AVRider_PI--17IDM_5PI.csv", 
"data/raw_data/IDM_AVRider_AUG--8IDM_14AUG.csv", 
"data/raw_data/IDM_AVRider_AUG--22IDM_0AUG.csv", 
"data/raw_data/IDM_AVRider_LinOpt--7IDM_15LinOpt.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--15IDM_7MLYAU2.csv", 
"data/raw_data/IDM_AVRider_PI--2IDM_20PI.csv", 
"data/raw_data/IDM_AVRider_LinOpt--20IDM_2LinOpt.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--14IDM_8MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FS--7IDM_15FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--3IDM_19MLYAU2.csv", 
"data/raw_data/IDM_AVRider_LACC--19IDM_3LACC.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--21IDM_1MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZN--11IDM_11FUZN.csv", 
"data/raw_data/IDM_AVRider_FUZN--4IDM_18FUZN.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--11IDM_11MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZN--5IDM_17FUZN.csv", 
"data/raw_data/IDM_AVRider_PI--19IDM_3PI.csv", 
"data/raw_data/IDM_AVRider_BCM--0IDM_22BCM.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--20IDM_2MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZO--3IDM_19FUZO.csv", 
"data/raw_data/IDM_AVRider_FUZN--19IDM_3FUZN.csv", 
"data/raw_data/IDM_AVRider_LACC--5IDM_17LACC.csv", 
"data/raw_data/IDM_AVRider_BCM--13IDM_9BCM.csv", 
"data/raw_data/IDM_AVRider_FUZN--21IDM_1FUZN.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--11IDM_11MLYAU1.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--9IDM_13MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FS--1IDM_21FS.csv", 
"data/raw_data/IDM_AVRider_PI--0IDM_22PI.csv", 
"data/raw_data/IDM_AVRider_FS--8IDM_14FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--1IDM_21MLYAU2.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--7IDM_15MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZN--17IDM_5FUZN.csv", 
"data/raw_data/IDM_AVRider_LACC--18IDM_4LACC.csv", 
"data/raw_data/IDM_AVRider_LACC--12IDM_10LACC.csv", 
"data/raw_data/IDM_AVRider_LACC--4IDM_18LACC.csv", 
"data/raw_data/IDM_AVRider_LACC--21IDM_1LACC.csv", 
"data/raw_data/IDM_AVRider_FS--0IDM_22FS.csv", 
"data/raw_data/IDM_AVRider_AUG--18IDM_4AUG.csv", 
"data/raw_data/IDM_AVRider_PI--21IDM_1PI.csv", 
"data/raw_data/IDM_AVRider_FUZO--9IDM_13FUZO.csv", 
"data/raw_data/IDM_AVRider_LACC--22IDM_0LACC.csv", 
"data/raw_data/IDM_AVRider_LinOpt--19IDM_3LinOpt.csv", 
"data/raw_data/IDM_AVRider_FS--21IDM_1FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--1IDM_21MLYAU1.csv", 
"data/raw_data/IDM_AVRider_BCM--20IDM_2BCM.csv", 
"data/raw_data/IDM_AVRider_AUG--12IDM_10AUG.csv", 
"data/raw_data/IDM_AVRider_FS--11IDM_11FS.csv", 
"data/raw_data/IDM_AVRider_FUZO--8IDM_14FUZO.csv", 
"data/raw_data/IDM_AVRider_BCM--7IDM_15BCM.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--19IDM_3MLYAU1.csv", 
"data/raw_data/IDM_AVRider_BCM--10IDM_12BCM.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--16IDM_6MLYAU1.csv", 
"data/raw_data/IDM_AVRider_LinOpt--2IDM_20LinOpt.csv", 
"data/raw_data/IDM_AVRider_BCM--17IDM_5BCM.csv", 
"data/raw_data/IDM_AVRider_BCM--12IDM_10BCM.csv", 
"data/raw_data/IDM_AVRider_AUG--20IDM_2AUG.csv", 
"data/raw_data/IDM_AVRider_FUZN--9IDM_13FUZN.csv", 
"data/raw_data/IDM_AVRider_LACC--15IDM_7LACC.csv", 
"data/raw_data/IDM_AVRider_LinOpt--12IDM_10LinOpt.csv", 
"data/raw_data/IDM_AVRider_AUG--19IDM_3AUG.csv", 
"data/raw_data/IDM_AVRider_LinOpt--15IDM_7LinOpt.csv", 
"data/raw_data/IDM_AVRider_FUZO--17IDM_5FUZO.csv", 
"data/raw_data/IDM_AVRider_LACC--14IDM_8LACC.csv", 
"data/raw_data/IDM_AVRider_FS--22IDM_0FS.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--12IDM_10MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FUZN--1IDM_21FUZN.csv", 
"data/raw_data/IDM_AVRider_FUZN--6IDM_16FUZN.csv", 
"data/raw_data/IDM_AVRider_AUG--21IDM_1AUG.csv", 
"data/raw_data/IDM_AVRider_AUG--3IDM_19AUG.csv", 
"data/raw_data/IDM_AVRider_FUZN--20IDM_2FUZN.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--20IDM_2MLYAU1.csv", 
"data/raw_data/IDM_AVRider_FS--5IDM_17FS.csv", 
"data/raw_data/IDM_AVRider_FUZO--18IDM_4FUZO.csv", 
"data/raw_data/IDM_AVRider_AUG--2IDM_20AUG.csv", 
"data/raw_data/IDM_AVRider_AUG--14IDM_8AUG.csv", 
"data/raw_data/IDM_AVRider_FS--10IDM_12FS.csv", 
"data/raw_data/IDM_AVRider_FUZN--12IDM_10FUZN.csv", 
"data/raw_data/IDM_AVRider_PI--7IDM_15PI.csv", 
"data/raw_data/IDM_AVRider_BCM--9IDM_13BCM.csv", 
"data/raw_data/IDM_AVRider_MLYAU2--17IDM_5MLYAU2.csv", 
"data/raw_data/IDM_AVRider_FS--17IDM_5FS.csv", 
"data/raw_data/IDM_AVRider_BCM--21IDM_1BCM.csv", 
"data/raw_data/IDM_AVRider_FS--6IDM_16FS.csv", 
"data/raw_data/IDM_AVRider_PI--6IDM_16PI.csv", 
"data/raw_data/IDM_AVRider_PI--5IDM_17PI.csv", 
"data/raw_data/IDM_AVRider_AUG--16IDM_6AUG.csv", 
"data/raw_data/IDM_AVRider_BCM--4IDM_18BCM.csv", 
"data/raw_data/IDM_AVRider_FUZN--18IDM_4FUZN.csv", 
"data/raw_data/IDM_AVRider_PI--16IDM_6PI.csv", 
"data/raw_data/IDM_AVRider_PI--1IDM_21PI.csv", 
"data/raw_data/IDM_AVRider_LinOpt--13IDM_9LinOpt.csv", 
"data/raw_data/IDM_AVRider_AUG--10IDM_12AUG.csv", 
"data/raw_data/IDM_AVRider_LACC--0IDM_22LACC.csv", 
"data/raw_data/IDM_AVRider_MLYAU1--4IDM_18MLYAU1.csv"];

// metrics filenames
METRICS_FILE_LIST = ["data/metrics/Big_4IDM_18MLYAU1.csv", 
"data/metrics/Big_1IDM_21LACC.csv", 
"data/metrics/Big_8IDM_14AUG.csv", 
"data/metrics/Big_5IDM_17MLYAU1.csv", 
"data/metrics/Big_20IDM_2PI.csv", 
"data/metrics/Big_14IDM_8FS.csv", 
"data/metrics/Big_16IDM_6PI.csv", 
"data/metrics/Big_11IDM_11LinOpt.csv", 
"data/metrics/Big_20IDM_2FUZO.csv", 
"data/metrics/Big_18IDM_4LinOpt.csv", 
"data/metrics/Big_11IDM_11PI.csv", 
"data/metrics/Big_12IDM_10BCM.csv", 
"data/metrics/Big_9IDM_13PI.csv", 
"data/metrics/Big_20IDM_2FS.csv", 
"data/metrics/Big_3IDM_19MLYAU2.csv", 
"data/metrics/Big_15IDM_7BCM.csv", 
"data/metrics/Big_11IDM_11FUZN.csv", 
"data/metrics/Big_20IDM_2FUZN.csv", 
"data/metrics/Big_12IDM_10MLYAU1.csv", 
"data/metrics/Big_19IDM_3PI.csv", 
"data/metrics/Big_2IDM_20FUZN.csv", 
"data/metrics/Big_13IDM_9LACC.csv", 
"data/metrics/Big_15IDM_7MLYAU2.csv", 
"data/metrics/Big_19IDM_3LACC.csv", 
"data/metrics/Big_4IDM_18MLYAU2.csv", 
"data/metrics/Big_19IDM_3LinOpt.csv", 
"data/metrics/Big_4IDM_18FUZN.csv", 
"data/metrics/Big_10IDM_12MLYAU2.csv", 
"data/metrics/Big_19IDM_3MLYAU2.csv", 
"data/metrics/Big_8IDM_14MLYAU1.csv", 
"data/metrics/Big_10IDM_12AUG.csv", 
"data/metrics/Big_0IDM_22AUG.csv", 
"data/metrics/Big_16IDM_6FS.csv", 
"data/metrics/Big_21IDM_1LACC.csv", 
"data/metrics/Big_19IDM_3AUG.csv", 
"data/metrics/Big_11IDM_11MLYAU1.csv", 
"data/metrics/Big_3IDM_19AUG.csv", 
"data/metrics/Big_1IDM_21MLYAU1.csv", 
"data/metrics/Big_5IDM_17MLYAU2.csv", 
"data/metrics/Big_16IDM_6FUZN.csv", 
"data/metrics/Big_21IDM_1FS.csv", 
"data/metrics/Big_16IDM_6MLYAU2.csv", 
"data/metrics/Big_17IDM_5PI.csv", 
"data/metrics/Big_0IDM_22PI.csv", 
"data/metrics/Big_21IDM_1LinOpt.csv", 
"data/metrics/Big_20IDM_2MLYAU2.csv", 
"data/metrics/Big_0IDM_22BCM.csv", 
"data/metrics/Big_5IDM_17FUZN.csv", 
"data/metrics/Big_7IDM_15LinOpt.csv", 
"data/metrics/Big_17IDM_5MLYAU2.csv", 
"data/metrics/Big_20IDM_2LACC.csv", 
"data/metrics/Big_18IDM_4MLYAU2.csv", 
"data/metrics/Big_19IDM_3MLYAU1.csv", 
"data/metrics/Big_4IDM_18BCM.csv", 
"data/metrics/Big_3IDM_19PI.csv", 
"data/metrics/Big_21IDM_1FUZO.csv", 
"data/metrics/Big_7IDM_15PI.csv", 
"data/metrics/Big_9IDM_13MLYAU2.csv", 
"data/metrics/Big_9IDM_13BCM.csv", 
"data/metrics/Big_8IDM_14FUZN.csv", 
"data/metrics/Big_6IDM_16FUZN.csv", 
"data/metrics/Big_21IDM_1AUG.csv", 
"data/metrics/Big_3IDM_19MLYAU1.csv", 
"data/metrics/Big_13IDM_9LinOpt.csv", 
"data/metrics/Big_13IDM_9BCM.csv", 
"data/metrics/Big_17IDM_5MLYAU1.csv", 
"data/metrics/Big_5IDM_17FS.csv", 
"data/metrics/Big_7IDM_15MLYAU1.csv", 
"data/metrics/Big_14IDM_8BCM.csv", 
"data/metrics/Big_11IDM_11BCM.csv", 
"data/metrics/Big_9IDM_13FS.csv", 
"data/metrics/Big_10IDM_12FUZO.csv", 
"data/metrics/Big_15IDM_7AUG.csv", 
"data/metrics/Big_4IDM_18LinOpt.csv", 
"data/metrics/Big_10IDM_12LACC.csv", 
"data/metrics/Big_7IDM_15AUG.csv", 
"data/metrics/Big_2IDM_20FUZO.csv", 
"data/metrics/Big_1IDM_21AUG.csv", 
"data/metrics/Big_18IDM_4AUG.csv", 
"data/metrics/Big_4IDM_18FS.csv", 
"data/metrics/Big_17IDM_5BCM.csv", 
"data/metrics/Big_16IDM_6FUZO.csv", 
"data/metrics/Big_12IDM_10LACC.csv", 
"data/metrics/Big_2IDM_20MLYAU2.csv", 
"data/metrics/Big_7IDM_15FS.csv", 
"data/metrics/Big_21IDM_1BCM.csv", 
"data/metrics/Big_12IDM_10AUG.csv", 
"data/metrics/Big_16IDM_6BCM.csv", 
"data/metrics/Big_15IDM_7LinOpt.csv", 
"data/metrics/Big_9IDM_13LinOpt.csv", 
"data/metrics/Big_2IDM_20PI.csv", 
"data/metrics/Big_18IDM_4FS.csv", 
"data/metrics/Big_8IDM_14FUZO.csv", 
"data/metrics/Big_14IDM_8AUG.csv", 
"data/metrics/Big_8IDM_14LACC.csv", 
"data/metrics/Big_14IDM_8MLYAU2.csv", 
"data/metrics/Big_19IDM_3BCM.csv", 
"data/metrics/Big_3IDM_19LinOpt.csv", 
"data/metrics/Big_4IDM_18FUZO.csv", 
"data/metrics/Big_8IDM_14BCM.csv", 
"data/metrics/Big_8IDM_14MLYAU2.csv", 
"data/metrics/Big_3IDM_19FUZO.csv", 
"data/metrics/Big_17IDM_5AUG.csv", 
"data/metrics/Big_0IDM_22MLYAU2.csv", 
"data/metrics/Big_16IDM_6AUG.csv", 
"data/metrics/Big_10IDM_12MLYAU1.csv", 
"data/metrics/Big_11IDM_11MLYAU2.csv", 
"data/metrics/Big_13IDM_9MLYAU2.csv", 
"data/metrics/Big_2IDM_20MLYAU1.csv", 
"data/metrics/Big_15IDM_7FUZN.csv", 
"data/metrics/Big_3IDM_19LACC.csv", 
"data/metrics/Big_15IDM_7PI.csv", 
"data/metrics/Big_13IDM_9FUZO.csv", 
"data/metrics/Big_4IDM_18PI.csv", 
"data/metrics/Big_13IDM_9FS.csv", 
"data/metrics/Big_6IDM_16FUZO.csv", 
"data/metrics/Big_2IDM_20FS.csv", 
"data/metrics/Big_0IDM_22LinOpt.csv", 
"data/metrics/Big_8IDM_14LinOpt.csv", 
"data/metrics/Big_16IDM_6MLYAU1.csv", 
"data/metrics/Big_14IDM_8LinOpt.csv", 
"data/metrics/Big_10IDM_12PI.csv", 
"data/metrics/Big_5IDM_17BCM.csv", 
"data/metrics/Big_1IDM_21FUZN.csv", 
"data/metrics/Big_9IDM_13FUZN.csv", 
"data/metrics/Big_17IDM_5LACC.csv", 
"data/metrics/Big_14IDM_8FUZN.csv", 
"data/metrics/Big_9IDM_13MLYAU1.csv", 
"data/metrics/Big_7IDM_15FUZN.csv", 
"data/metrics/Big_21IDM_1FUZN.csv", 
"data/metrics/Big_2IDM_20LinOpt.csv", 
"data/metrics/Big_7IDM_15LACC.csv", 
"data/metrics/Big_18IDM_4MLYAU1.csv", 
"data/metrics/Big_11IDM_11LACC.csv", 
"data/metrics/Big_6IDM_16MLYAU2.csv", 
"data/metrics/Big_2IDM_20BCM.csv", 
"data/metrics/Big_20IDM_2LinOpt.csv", 
"data/metrics/Big_10IDM_12FUZN.csv", 
"data/metrics/Big_18IDM_4LACC.csv", 
"data/metrics/Big_5IDM_17LACC.csv", 
"data/metrics/Big_5IDM_17FUZO.csv", 
"data/metrics/Big_4IDM_18AUG.csv", 
"data/metrics/Big_13IDM_9AUG.csv", 
"data/metrics/Big_12IDM_10PI.csv", 
"data/metrics/Big_3IDM_19BCM.csv", 
"data/metrics/Big_18IDM_4FUZN.csv", 
"data/metrics/Big_1IDM_21LinOpt.csv", 
"data/metrics/Big_1IDM_21BCM.csv", 
"data/metrics/Big_0IDM_22LACC.csv", 
"data/metrics/Big_7IDM_15MLYAU2.csv", 
"data/metrics/Big_11IDM_11AUG.csv", 
"data/metrics/Big_13IDM_9FUZN.csv", 
"data/metrics/Big_21IDM_1MLYAU2.csv", 
"data/metrics/Big_17IDM_5FS.csv", 
"data/metrics/Big_14IDM_8LACC.csv", 
"data/metrics/Big_0IDM_22FS.csv", 
"data/metrics/Big_6IDM_16PI.csv", 
"data/metrics/Big_2IDM_20LACC.csv", 
"data/metrics/Big_15IDM_7FS.csv", 
"data/metrics/Big_8IDM_14FS.csv", 
"data/metrics/Big_9IDM_13AUG.csv", 
"data/metrics/Big_17IDM_5LinOpt.csv", 
"data/metrics/Big_12IDM_10FS.csv", 
"data/metrics/Big_19IDM_3FS.csv", 
"data/metrics/Big_3IDM_19FS.csv", 
"data/metrics/Big_1IDM_21FS.csv", 
"data/metrics/Big_11IDM_11FS.csv", 
"data/metrics/Big_16IDM_6LACC.csv", 
"data/metrics/Big_0IDM_22FUZN.csv", 
"data/metrics/Big_6IDM_16BCM.csv", 
"data/metrics/Big_21IDM_1MLYAU1.csv", 
"data/metrics/Big_15IDM_7FUZO.csv", 
"data/metrics/Big_13IDM_9MLYAU1.csv", 
"data/metrics/Big_11IDM_11FUZO.csv", 
"data/metrics/Big_5IDM_17PI.csv", 
"data/metrics/Big_5IDM_17AUG.csv", 
"data/metrics/Big_15IDM_7MLYAU1.csv", 
"data/metrics/Big_0IDM_22MLYAU1.csv", 
"data/metrics/Big_1IDM_21MLYAU2.csv", 
"data/metrics/Big_12IDM_10FUZN.csv", 
"data/metrics/Big_6IDM_16LACC.csv", 
"data/metrics/Big_9IDM_13FUZO.csv", 
"data/metrics/Big_5IDM_17LinOpt.csv", 
"data/metrics/Big_4IDM_18LACC.csv", 
"data/metrics/Big_21IDM_1PI.csv", 
"data/metrics/Big_20IDM_2MLYAU1.csv", 
"data/metrics/Big_20IDM_2AUG.csv", 
"data/metrics/Big_14IDM_8MLYAU1.csv", 
"data/metrics/Big_6IDM_16MLYAU1.csv", 
"data/metrics/Big_12IDM_10FUZO.csv", 
"data/metrics/Big_1IDM_21FUZO.csv", 
"data/metrics/Big_12IDM_10LinOpt.csv", 
"data/metrics/Big_2IDM_20AUG.csv", 
"data/metrics/Big_6IDM_16LinOpt.csv", 
"data/metrics/Big_19IDM_3FUZN.csv", 
"data/metrics/Big_18IDM_4BCM.csv", 
"data/metrics/Big_6IDM_16AUG.csv", 
"data/metrics/Big_12IDM_10MLYAU2.csv", 
"data/metrics/Big_17IDM_5FUZN.csv", 
"data/metrics/Big_14IDM_8FUZO.csv", 
"data/metrics/Big_20IDM_2BCM.csv", 
"data/metrics/Big_18IDM_4PI.csv", 
"data/metrics/Big_3IDM_19FUZN.csv", 
"data/metrics/Big_15IDM_7LACC.csv", 
"data/metrics/Big_7IDM_15BCM.csv", 
"data/metrics/Big_10IDM_12LinOpt.csv", 
"data/metrics/Big_8IDM_14PI.csv", 
"data/metrics/Big_16IDM_6LinOpt.csv", 
"data/metrics/Big_0IDM_22FUZO.csv", 
"data/metrics/Big_10IDM_12FS.csv", 
"data/metrics/Big_10IDM_12BCM.csv", 
"data/metrics/Big_14IDM_8PI.csv", 
"data/metrics/Big_18IDM_4FUZO.csv", 
"data/metrics/Big_9IDM_13LACC.csv", 
"data/metrics/Big_19IDM_3FUZO.csv", 
"data/metrics/Big_1IDM_21PI.csv", 
"data/metrics/Big_7IDM_15FUZO.csv", 
"data/metrics/Big_13IDM_9PI.csv", 
"data/metrics/Big_6IDM_16FS.csv", 
"data/metrics/Big_17IDM_5FUZO.csv"];
