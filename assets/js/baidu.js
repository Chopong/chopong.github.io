	/**
	 * 查询站点数据
	 * @param user		用户
	 * @param siteId 	站点ID
	 * @param startDate	开始时间
	 * @param endDate	结束时间
	 * @author shy		
	 * @date 2016-11-16 下午01:23:16
	 */
	public static DataResult getSiteData(WebsiteUser user,Integer siteId,String startDate,String endDate,String gran){
		Gson gson = new Gson();
		AuthHeader header = new AuthHeader();
		header.setUsername(user.getUserName());
		header.setToken(user.getToken());
		header.setPassword(user.getPassword());
		header.setAccount_type(1);
		
		ApiRequest request = new ApiRequest();
		GetDataParamBase body = new GetDataParamBase();
		body.setSite_id(siteId);
		body.setMetrics(AppConstans.METRICS);
		body.setMethod(AppConstans.METHOD_TIME);
		body.setMax_result(0);		//	默认查询全部
		body.setGran(gran);
		//body.setOrder("visitor_count,desc");
		//body.setStart_index(0);	//	默认不分页
		body.setStart_date(startDate);
		body.setEnd_date(endDate);
		request.setHeader(header);
		request.setBody(body);
		String json = gson.toJson(request);
		String resultStr =  HttpClientUtils.doPost(user.getUcid(),AppConstans.GET_SITE_DATA, json.getBytes(), 20000, "utf-8");
        System.out.println("data result ---siteId --:"+siteId+"startDate:"+startDate+"endDate:"+endDate+"--result:"+resultStr);
        
        ApiResponse resp = gson.fromJson(resultStr.replaceAll("\"--\"", "0"), new TypeToken(){}.getType());
        GetDataResponse respResult = resp.getBody().getData().get(0);
        DataResult result = respResult.getResult();
        if(null != resp && null != resp.getHeader() && resp.getHeader().getSucc()>0){
        
	        //百度返回数据中items 包含四个list 其中第一个是时间列表  第二个是数据列表  第三 第四均为空
	        List itemDate = (List) resp.getBody().getData().get(0).getResult().getItems().get(0);
	        List itemData = (List) resp.getBody().getData().get(0).getResult().getItems().get(1);
	        
	        List listResult = new ArrayList();
	        DateCount dc;
	        for(int i = 0 ;i < itemDate.size() ;i++){
	        	dc = new DateCount();
	        	dc.setDate(itemDate.get(i).get(0));
	        	dc.setPv(getCountValue(itemData.get(i).get(0)));
	        	dc.setUv(getCountValue(itemData.get(i).get(1)));
	        	dc.setNv(getCountValue(itemData.get(i).get(2)));
	        	dc.setIp(getCountValue(itemData.get(i).get(3)));
	        	listResult.add(dc);
	        }
	        result.setDataList(listResult);
        }
        return result;
	}